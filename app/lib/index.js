'use strict';
// Export library of functions
module.exports = (config) => {
  return {
    controllers: require('./controllers')(config),
    http: require('./http')(config),
    security: require('./security')(config),
    validators: require('./validators')(config),
  };
};
