'use strict';
// Dependencies and variables
var mongoose = require('mongoose');
var tokenSchema;
var Token;
// Build the schema
tokenSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    required: true
  }
});
// Create the model
Token = mongoose.model('Token', tokenSchema);
// Simply export the schema
module.exports = Token;
