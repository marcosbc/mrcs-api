'use strict';
var jwt = require('jsonwebtoken');
var Token = require('../models/token');
var Event = require('../models/event');
function validationErrorResponse (res, errors) {
  res.status(400);
  res.json(res.app.get('utils').http.getHttpError(400, errors));
}
function errorResponse (res, errors) {
  var httpUtils = res.app.get('utils').http;
  res.status(500).json(httpUtils.getHttpError(500, errors));
}
function unauthorizedResponse (res) {
  var httpUtils = res.app.get('utils').http;
  res.status(401).json(httpUtils.getHttpError(401, 'Unauthorized'));
}
function verifyToken (req, callback) {
  var secret = req.app.get('config').security.secret;
  if (typeof req.headers.authorization === 'undefined') {
    return callback(false);
  }
  var authorization = req.headers.authorization.split(' ');
  if (authorization[0] !== 'Bearer' || authorization.length !== 2) {
    return callback(false);
  }
  var token = authorization[1];
  Token.findOne({
    data: token
  }, (err, tokenEntry) => {
    if (err) {
      return callback(null, err);
    }
    if (tokenEntry !== null) {
      // Check if it has expired
      if (tokenEntry.expirationDate > new Date()) {
        // Verify if the signature is valid
        return jwt.verify(token, secret, function (err, decodedToken) {
          if (err) {
            return callback(null, err);
          }
          callback(decodedToken);
        });
      }
    }
    callback(null);
  });
}
module.exports = {
  get: (req, res, next) => {
    verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return errorResponse(res, err);
      }
      if (!token) {
        return unauthorizedResponse(res);
      }
      Event.find({
        ownerId: token.uid
      }, (err, data) => {
        if (err) {
          console.error(err);
          return errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  post: (req, res, next) => {
    verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return errorResponse(res, err);
      }
      if (!token) {
        return unauthorizedResponse(res);
      }
      // Verify the data is OK
      req.checkBody('title', 'Invalid title').isValidTitle();
      req.checkBody('description', 'Invalid description').isValidDescription();
      req.checkBody('icon', 'Invalid icon').isValidIcon();
      req.checkBody('cron', 'Invalid cron').isValidCron();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return validationErrorResponse(res, validationErrors);
      }
      // Create the event if everything went right
      var newEvent = new Event({
        title: req.body.title,
        icon: req.body.icon,
        description: req.body.description,
        cron: req.body.cron,
        ownerId: token.uid
      });
      newEvent.save((err, data) => {
        if (err) {
          console.error(err);
          return errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  show: (req, res, next) => {
    verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return errorResponse(res, err);
      }
      if (!token) {
        return unauthorizedResponse(res);
      }
      // Check if the object ID is correct and try to find it
      req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return validationErrorResponse(res, validationErrors);
      }
      Event.findOne({
        '_id': req.params.id,
        ownerId: token.uid
      }, (err, data) => {
        if (err) {
          console.error(err);
          return errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  edit: (req, res, next) => {
    verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return errorResponse(res, err);
      }
      if (!token) {
        return unauthorizedResponse(res);
      }
      // Verify the data is OK
      req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
      req.checkBody('title', 'Invalid title').isValidTitle();
      req.checkBody('description', 'Invalid description').isValidDescription();
      req.checkBody('icon', 'Invalid icon').isValidIcon();
      req.checkBody('cron', 'Invalid cron').isValidCron();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return validationErrorResponse(res, validationErrors);
      }
      // Update the event if it exists
      Event.findOneAndUpdate({
        '_id': req.params.id,
        ownerId: token.uid
      }, {
        title: req.body.title,
        description: req.body.description,
        icon: req.body.icon,
        cron: req.body.cron
      }, {
        // Return the updated doc
        new: true
      }, (err, data) => {
        if (err) {
          console.error(err);
          return errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  delete: (req, res, next) => {
    verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return errorResponse(res, err);
      }
      if (!token) {
        return unauthorizedResponse(res);
      }
      // Check if the object ID is correct and try to find it
      req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return validationErrorResponse(res, validationErrors);
      }
      Event.remove({
        '_id': req.params.id,
        ownerId: token.uid
      }, (err) => {
        if (err) {
          console.error(err);
          return errorResponse(res, err);
        }
        // The entry does not exist anymore
        res.json({});
      });
    });
  },
};
