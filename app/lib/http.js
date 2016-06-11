'use strict';
// Dependencies
var _ = require('underscore');
var config;
// Object of common-usage functions
class HttpFunctions {
  constructor (cfg) {
    config = cfg;
  }
  constructUrl (protocol, host, port, path) {
    var url = `${protocol}://${host}`;
    if ((protocol === 'http' && port !== 80) ||
        (protocol === 'https' && port !== 443)) {
      url += ':' + port;
    }
    url += path;
    return url;
  }
  getFrontEndUrl () {
    var protocol = _.defaults(config.frontend.protocol, 'http');
    var host = _.defaults(config.frontend.host, '127.0.0.1');
    var port = _.defaults(config.frontend.port, config.port);
    return this.constructUrl(protocol, host, port, config.base);
  }
  getHttpError (errorCode, msg) {
    return {
      error: true,
      code: errorCode,
      message: msg
    };
  }
}
// Export the previously created class
module.exports = (config) => {
  return new HttpFunctions(config);
};
