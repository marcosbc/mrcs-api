'use strict';
var jwt = require('jsonwebtoken');
var Token = require('../models/token');
class HttpFunctions {
  validationErrorResponse (res, errors) {
    var httpUtils = res.app.get('utils').http;
    res.status(400).json(httpUtils.getHttpError(400, errors));
  }
  errorResponse (res, errors) {
    var httpUtils = res.app.get('utils').http;
    res.status(500).json(httpUtils.getHttpError(500, errors));
  }
  unauthorizedResponse (res) {
    var httpUtils = res.app.get('utils').http;
    res.status(401).json(httpUtils.getHttpError(401, 'Unauthorized'));
  }
  verifyToken (req, callback) {
    var secret = req.app.get('config').security.secret;
    if (typeof req.headers.authorization === 'undefined') {
      return callback(null);
    }
    var authorization = req.headers.authorization.split(' ');
    if (authorization.length !== 2 || authorization[0] !== 'Bearer') {
      return callback(null);
    }
    var token = authorization[1];
    Token.findOne({
      data: token
    }, (err, tokenEntry) => {
      if (err) {
        return callback(null, err);
      }
      if (tokenEntry !== null) {
        // Check if it has expired
        if (tokenEntry.expirationDate > new Date()) {
          // Verify if the signature is valid
          return jwt.verify(token, secret, function (err, decodedToken) {
            if (err) {
              return callback(null, err);
            }
            callback(decodedToken);
          });
        }
      }
      callback(null);
    });
  }
}
// Export the previously created class
module.exports = () => {
  return new HttpFunctions();
};
