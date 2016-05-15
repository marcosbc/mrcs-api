'use strict';
// Dependencies and variables
var mongoose = require('mongoose');
var userSchema;
var User;
// Build the schema
userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  role: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  },
  lastAccess: {
    type: Date,
    required: false
  }
});
// Create the model
User = mongoose.model('User', userSchema);
// Simply export the schema
module.exports = User;
