'use strict';
// Dependencies and variables
var express = require('express');
var router = express.Router();
// Initialize routes
router.get('/', (req, res) => {
  res.json({
    hello: 'world'
  });
});
// Export the router
module.exports = router;
