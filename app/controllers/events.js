'use strict';
var Event = require('../models/event');
function validationErrorResponse (res, errors) {
  res.status(400);
  res.json(res.app.get('utils').http.getHttpError(400, errors));
}
function errorResponse (res, errors) {
  res.status(500);
  res.json(res.app.get('utils').http.getHttpError(500, errors));
}
module.exports = {
  get: (req, res, next) => {
    Event.find({}, (err, data) => {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  post: (req, res, next) => {
    // Verify the data is OK
    req.checkBody('title', 'Invalid title').isValidTitle();
    req.checkBody('description', 'Invalid description').isValidDescription();
    req.checkBody('icon', 'Invalid icon').isValidIcon();
    req.checkBody('cron', 'Invalid cron').isValidCron();
    // Check for validation errors
    var validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    // Create the event if everything went right
    var newEvent = new Event({
      title: req.body.title,
      icon: req.body.icon,
      description: req.body.description,
      cron: req.body.cron
    });
    newEvent.save(function (err, data) {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  show: (req, res, next) => {
    // Check if the object ID is correct and try to find it
    req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
    // Check for validation errors
    var validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    Event.findOne({
      '_id': req.params.id
    }, function (err, data) {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  edit: (req, res, next) => {
    // Verify the data is OK
    req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
    req.checkBody('title', 'Invalid title').isValidTitle();
    req.checkBody('description', 'Invalid description').isValidDescription();
    req.checkBody('icon', 'Invalid icon').isValidIcon();
    req.checkBody('cron', 'Invalid cron').isValidCron();
    // Check for validation errors
    var validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    // Update the event if it exists
    Event.findOneAndUpdate({
      '_id': req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon,
      cron: req.body.cron,
    }, {
      // Return the updated doc
      new: true
    }, function (err, data) {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  delete: (req, res, next) => {
    // Check if the object ID is correct and try to find it
    req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
    // Check for validation errors
    var validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    Event.remove({
      '_id': req.params.id
    }, function (err) {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        // The entry does not exist anymore
        res.json({});
      }
    });
  },
};
