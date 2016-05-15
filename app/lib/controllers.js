'use strict';
// Variables and dependencies
var fs = require('fs');
var _ = require('underscore');
var config;
var controllersPath = '../controllers';
// Create the bootstrap class
class ControllerFunctions {
  constructor (cfg) {
    config = cfg;
  }
  getControllers () {
    var controllers = [];
    // Load controllers and related models
    _.each(fs.readdirSync(`${__dirname}/${controllersPath}`), (file) => {
      if (file.substr(-3) === '.js') {
        var name = file.slice(0, -3);
        var controller = require(`${controllersPath}/${name}`);
        var method;
        var path;
        var key;
        // Assign methods in a controller to a URI
        for (key in controller) {
          switch (key) {
            case 'index':
              path = '';
              method = 'get';
              break;
            case 'list':
              path = `${name}s`;
              method = 'get';
              break;
            case 'create':
              path = `${name}s`;
              method = 'post';
              break;
            case 'show':
              path = `${name}s/:${name}_id`;
              method = 'get';
              break;
            case 'edit':
              path = `${name}s/:${name}_id`;
              method = 'post';
              break;
            default:
              throw new Error(`Unrecognized route: ${name}.${key}`);
          }
          controllers.push({
            method: method,
            path: config.base + path,
            handler: controller[key]
          });
        }
      }
    });
    return controllers;
  }
}
// Export the previously created class
module.exports = (config) => {
  return new ControllerFunctions(config);
};
