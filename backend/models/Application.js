/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

  This file is for Application Model in the Asset Finance Management Platform.
*/

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Link to User model if users are part of your system

  income: { 
    type: Number, 
    required: true,
    min: [0, 'Income cannot be negative']
  },

  expenses: { 
    type: Number, 
    required: true,
    min: [0, 'Expenses cannot be negative']
  },

  assets: { 
    type: Number, 
    required: true,
    min: [0, 'Assets cannot be negative']
  },

  liabilities: { 
    type: Number, 
    required: true,
    min: [0, 'Liabilities cannot be negative']
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }, // Tracking application status

  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }, // Optional notes field
}, { timestamps: true });

// Custom method for calculating net worth
applicationSchema.methods.calculateNetWorth = function() {
  return this.assets - this.liabilities;
};

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
