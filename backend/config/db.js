/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

  This file is for database configuration in the Asset Finance Management Platform.
  User: asset_finance_DB
  Password: ltlS92R1lDiUcZ51
*/

// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Establish MongoDB connection using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    // Log the error and exit the process on failure
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;

