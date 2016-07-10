'use strict';
// Load Event model
var Event = require('../models/event');
// The controllers will be function-base
module.exports = {
  list: (req, res, next) => {
    console.log('Processing event listing');
    Event.find({}, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: true,
          code: 500,
          message: err
        });
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  create: (req, res, next) => {
    console.log('Processing event creation');
    // Verify the data is OK
    req.checkBody('title', 'Invalid title').isValidTitle();
    req.checkBody('description', 'Invalid description').isValidDescription();
    req.checkBody('icon', 'Invalid icon').isValidIcon();
    req.checkBody('cron', 'Invalid cron').isValidCron();
    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        error: true,
        code: 400,
        message: errors
      });
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
        res.status(500).json({
          error: true,
          code: 500,
          message: err
        });
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  show: (req, res, next) => {
    console.log('Processing single-event fetching');
    // Check if the object ID is correct and try to find it
    req.checkParams('event_id', 'Invalid event identifier').isValidIdentifier();
    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        error: true,
        code: 400,
        message: errors
      });
      return;
    }
    Event.findOne({
      '_id': req.params.event_id
    }, function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: true,
          code: 500,
          message: err
        });
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  edit: (req, res, next) => {
    console.log('Processing single-event editing');
    // Verify the data is OK
    req.checkParams('event_id', 'Invalid event identifier').isValidIdentifier();
    req.checkBody('title', 'Invalid title').isValidTitle();
    req.checkBody('description', 'Invalid description').isValidDescription();
    req.checkBody('icon', 'Invalid icon').isValidIcon();
    req.checkBody('cron', 'Invalid cron').isValidCron();
    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        error: true,
        code: 400,
        message: errors
      });
      return;
    }
    // Update the event if it exists
    Event.findOneAndUpdate({
      '_id': req.params.event_id
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
        res.status(500).json({
          error: true,
          code: 500,
          message: err
        });
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  }
};
