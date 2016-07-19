'use strict';
// Dependencies and variables
var mongoose = require('mongoose');
var eventSchema;
var Event;
// Build the schema
eventSchema = new mongoose.Schema({
  _createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: false
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
    required: false
  },
  lastNotification: {
    type: Date,
    required: true,
    default: Date.now
  }
});
// Create the model
Event = mongoose.model('Event', eventSchema);
// Simply export the schema
module.exports = Event;
