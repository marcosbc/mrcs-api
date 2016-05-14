'use strict';
// Object of common-usage functions
var utils = {
  parseUrl: (config) => {
    var url = config.protocol + '://' + config.host;
    if ((config.protocol === 'http' && config.port !== 80) ||
        (config.protocol === 'https' && config.port !== 443)) {
      url += ':' + config.port;
    }
    url += config.base;
    return url;
  }
};
// Export the functions object
module.exports = utils;
