'use strict';
// Dependencies and variables
var mongoose = require('mongoose');
var eventSchema;
var Event;
// Build the schema
eventSchema = new mongoose.Schema({
  _ownerId: {
    type: String,
    required: false,
    index: true
  },
  _createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  cron: {
    type: String,
    required: true
  },
  lastNotification: {
    type: Date,
    required: false,
    default: Date.now
  }
});
// Create the model
Event = mongoose.model('Event', eventSchema);
// Simply export the schema
module.exports = Event;
