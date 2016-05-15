'use strict';
// Dependencies
var _ = require('underscore');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
// Configure the salter
var secret;
var saltRounds;
// Initialize the security class
class SecurityFunctions {
  constructor (cfg) {
    secret = _.defaults(cfg.security.secret, 'change-in-configuration');
    saltRounds = _.defaults(cfg.security.saltRounds, 5);
  }
  generateHash (plain) {
    return bcrypt.hashSync(plain, bcrypt.genSaltSync(saltRounds));
  }
  compareHash (plain, hash) {
    return bcrypt.compareSync(plain, hash);
  }
  encryptText (str) {
    var cipher = crypto.createCipher('aes-256-cbc', secret);
    return cipher.update(str, 'utf8', 'base64') + cipher.final('base64');
  }
  decryptText (str) {
    var decipher = crypto.createDecipher('aes-256-cbc', secret);
    return decipher.update(str, 'base64', 'utf8') + cipher.final('utf8');
  }
}
// Export the previously created class
module.exports = (config) => {
  return new SecurityFunctions(config);
};
