'use strict';
// Dependencies and variables
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('underscore');
var utils = require('./utils');
var config;
var app;
var route;
// Try to load configuration file
try {
  config = require('../conf/configuration');
} catch (err) {
  console.error('Could not load conf/configuration.js!');
  process.exit(1);
}
app = express();
// Configure Express environment
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('combined'));
// Dynamically load controllers
_.each(fs.readdirSync('./app/controllers'), (file) => {
  if (file.substr(-3) === '.js') {
    route = require(`./controllers/${file}`);
    route.controller(app);
  }
});
// Start the server
app.listen(config.port);
console.log('API server - Listening on ' + utils.parseUrl(config) +
            '\nEnvironment: ' + config.env);
