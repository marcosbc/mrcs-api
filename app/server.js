'use strict';
// Dependencies
var _ = require('underscore');
var express = require('express');
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
  console.error(error.stack);
  res.status(500).json(utils.http.getHttpError(500, 'Internal server error'));
});
app.use((req, res, next) => {
  res.status(404).json(utils.http.getHttpError(404, 'Not found'));
});
// Start the server
app.listen(config.port);
console.log('API server - Listening on ' + utils.http.getFrontEndUrl() + '\n' +
            'Environment: ' + config.env);
