'use strict';
// Load necessary models
// var Icon = require('../models/icon');
// Dependencies
var _ = require('underscore');
var validator = require('validator');
var config;
// Object of common-usage functions
class ValidatorFunctions {
  constructor (cfg) {
    config = cfg;
  }
  get customValidators () {
    return {
      isValidIdentifier: (value) => {
        return validator.isMongoId(value);
      },
      isValidTitle: (value) => {
        return validator.isLength(value, {min: 4, max: 96});
      },
      isValidDescription: (value) => {
        return validator.isLength(value, {min: 0, max: 1024});
      },
      isValidIcon: (value) => {
        return true; // TODO
        Icon.find({}, (err, data) => {
        });
      },
      isValidCron: (value) => {
        return true; // TODO
      }
    }
  }
  get customSanitizers () {
    // No sanitizers for the moment
    return {};
  }
}
// Export the previously created class
module.exports = (config) => {
  return new ValidatorFunctions(config);
};
