/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

  This file is for Application Controller in the Asset Finance Management Platform.
*/

// const fs = require('fs');
// console.log(fs.existsSync('../models/Application.js'));
const Application = require('../models/Application');
console.log(Application);
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'application.log' })
  ]
});

exports.createApplication = [
  // Validate input fields
  body('income').isNumeric().withMessage('Income must be a number'),
  body('expenses').isNumeric().withMessage('Expenses must be a number'),
  body('assets').isNumeric().withMessage('Assets must be a number'),
  body('liabilities').isNumeric().withMessage('Liabilities must be a number'),

  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newApplication = new Application(req.body);
      await newApplication.save();
      logger.info(`New application created: ${newApplication._id}`);
      res.status(201).json(newApplication);
    } catch (error) {
      logger.error('Error creating application:', error.message);
      res.status(500).json({ message: 'Failed to create application', error: error.message });
    }
  }
];

exports.getApplications = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  try {
    const applications = await Application.find()
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalApplications = await Application.countDocuments();
    res.json({
      applications,
      totalApplications,
      totalPages: Math.ceil(totalApplications / limit),
      currentPage: page,
    });
  } catch (error) {
    logger.error('Error fetching applications:', error.message);
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(updatedApplication);
  } catch (error) {
    logger.error('Error updating application:', error.message);
    res.status(500).json({ message: 'Failed to update application', error: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    logger.error('Error deleting application:', error.message);
    res.status(500).json({ message: 'Failed to delete application', error: error.message });
  }
};
