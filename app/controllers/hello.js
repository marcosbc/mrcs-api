'use strict';
// Add routes to the Express engine
module.exports.controller = (app) => {
  app.get('/', (req, res) => {
    res.json({
      hello: 'world'
    });
  });
};
