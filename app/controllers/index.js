'use strict';
// The controllers will be function-base
module.exports = {
  index: (req, res, next) => {
    res.json({
      hello: 'world'
    });
  }
};
