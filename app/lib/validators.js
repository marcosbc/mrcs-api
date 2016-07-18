'use strict';
var validator = require('validator');
// Object of common-usage functions
class ValidatorFunctions {
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
module.exports = () => {
  return new ValidatorFunctions();
};
