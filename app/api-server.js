'use strict';
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var router = require('./router');
var utils = require('./utils');
// Initialize the class
class ApiServer {
  constructor (config) {
    this._config = config;
    this._app = express();
    this._app.use(bodyParser.urlencoded({
      extended: true
    }));
    this._app.use(bodyParser.json());
    // Enable request logging
    this._app.use(morgan('combined'));
    // Configure the API path
    this._app.use(this._config.base, router);
  }
  start () {
    this._app.listen(this._config.port);
    console.log('API server - Listening on ' + utils.parseUrl(this._config) +
                '\nEnvironment: ' + this._config.env);
  }
}
// The module exports the class
module.exports = ApiServer;
