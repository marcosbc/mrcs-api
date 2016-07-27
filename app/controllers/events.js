'use strict';
var Event = require('../models/event');
module.exports = {
  get: (req, res, next) => {
    var apiHttpUtils = req.app.get('apiUtils').http;
    apiHttpUtils.verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return apiHttpUtils.errorResponse(res, err);
      }
      if (!token) {
        return apiHttpUtils.unauthorizedResponse(res);
      }
      Event.find({
        ownerId: token.uid
      }, (err, data) => {
        if (err) {
          console.error(err);
          return apiHttpUtils.errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  post: (req, res, next) => {
    var apiHttpUtils = req.app.get('apiUtils').http;
    apiHttpUtils.verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return apiHttpUtils.errorResponse(res, err);
      }
      if (!token) {
        return apiHttpUtils.unauthorizedResponse(res);
      }
      // Verify the data is OK
      req.checkBody('title', 'Invalid title').isValidTitle();
      req.checkBody('description', 'Invalid description').isValidDescription();
      req.checkBody('icon', 'Invalid icon').isValidIcon();
      req.checkBody('cron', 'Invalid cron').isValidCron();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return apiHttpUtils.validationErrorResponse(res, validationErrors);
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
          return apiHttpUtils.errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  show: (req, res, next) => {
    var apiHttpUtils = req.app.get('apiUtils').http;
    apiHttpUtils.verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return apiHttpUtils.errorResponse(res, err);
      }
      if (!token) {
        return apiHttpUtils.unauthorizedResponse(res);
      }
      // Check if the object ID is correct and try to find it
      req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return apiHttpUtils.validationErrorResponse(res, validationErrors);
      }
      Event.findOne({
        '_id': req.params.id,
        ownerId: token.uid
      }, (err, data) => {
        if (err) {
          console.error(err);
          return apiHttpUtils.errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  edit: (req, res, next) => {
    var apiHttpUtils = req.app.get('apiUtils').http;
    apiHttpUtils.verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return apiHttpUtils.errorResponse(res, err);
      }
      if (!token) {
        return apiHttpUtils.unauthorizedResponse(res);
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
        return apiHttpUtils.validationErrorResponse(res, validationErrors);
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
          return apiHttpUtils.errorResponse(res, err);
        }
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      });
    });
  },
  delete: (req, res, next) => {
    var apiHttpUtils = req.app.get('apiUtils').http;
    apiHttpUtils.verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return apiHttpUtils.errorResponse(res, err);
      }
      if (!token) {
        return apiHttpUtils.unauthorizedResponse(res);
      }
      // Check if the object ID is correct and try to find it
      req.checkParams('id', 'Invalid event identifier').isValidIdentifier();
      // Check for validation errors
      var validationErrors = req.validationErrors();
      if (validationErrors) {
        return apiHttpUtils.validationErrorResponse(res, validationErrors);
      }
      Event.remove({
        '_id': req.params.id,
        ownerId: token.uid
      }, (err) => {
        if (err) {
          console.error(err);
          return apiHttpUtils.errorResponse(res, err);
        }
        // The entry does not exist anymore
        res.json({});
      });
    });
  }
};
