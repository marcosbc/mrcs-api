'use strict';
// Dependencies and variables
var ApiServer = require('./api-server');
var config;
var app;
// Try to load configuration file
try {
  config = require('../conf/configuration');
} catch (err) {
  console.error('Could not load conf/configuration.js!');
  process.exit(1);
}
// Start the application
app = new ApiServer(config);
app.start();
