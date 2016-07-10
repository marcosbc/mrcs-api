'use strict';
// Dependencies
var _ = require('underscore');
var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var waitForMongo = require('wait-for-mongo');
// Variables to use
var utils;
var config;
var app;
// Try to load configuration file
try {
  config = require('../conf/configuration');
} catch (err) {
  console.error('Could not load conf/configuration.js!');
  process.exit(1);
}
// Initialize functions that depend on configuration
utils = require('./lib')(config);
// Initialize the Express instance
app = express();
app.set('config', config);
app.set('utils', utils);
// Configure output format for the express instance
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator({
  customValidators: utils.validators.customValidators,
  customSanitizers: utils.validators.customSanitizers
}));
app.use(morgan('combined'));
// Create the MongoDB connection
waitForMongo(config.mongoDbUri, {timeout: 1000 * 60 * 2}, function (err) {
  if (err) {
    console.error('Timeout exceeded connecting to MongoDB');
    process.exit(1);
  }
  mongoose.connect(config.mongoDbUri);
});
// Populate controllers into the Express instance
_.each(utils.controllers.getControllers(), (controller) => {
  app[controller.method](controller.path, controller.handler);
});
// Error handling
app.use((error, req, res, next) => {
  var statusCode;
  var statusMessage;
  switch (error.statusCode) {
    case 400:
      statusCode = error.statusCode;
      statusMessage = 'Bad request';
      break;
    default:
      statusCode = 500;
      statusMessage = 'Internal server error';
      console.error(error.stack);
  }
  res.status(statusCode).json(utils.http.getHttpError(statusCode, statusMessage));
});
app.use((req, res, next) => {
  res.status(404).json(utils.http.getHttpError(404, 'Not found'));
});
// Start the server
app.listen(config.port);
console.log('API server - Listening on ' + utils.http.getFrontEndUrl() + '\n' +
            'Environment: ' + config.env);
