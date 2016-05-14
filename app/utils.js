'use strict';
// Dependencies
var _ = require('underscore');
// Object of common-usage functions
var utils = {
  parseUrl: (config) => {
    var protocol = _.defaults(config.frontend.protocol, 'http');
    var host = _.defaults(config.frontend.host, '127.0.0.1');
    var port = _.defaults(config.frontend.port, config.port);
    var url = `${protocol}://${host}`;
    if ((protocol === 'http' && port !== 80) ||
        (protocol === 'https' && port !== 443)) {
      url += ':' + port;
    }
    url += config.base;
    return url;
  }
};
// Export the functions object
module.exports = utils;
