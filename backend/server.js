/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

  This file is for Server Setup in the Asset Finance Management Platform.
*/

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

