

const express = require('express');
const cors = require('cors');
const alertRoutes = require('./routes/alertRoutes');
const connectDB = require("../../config/db");
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Alert Service is running' });
});

// Routes
app.use('api/alert', alertRoutes);


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Alert Service is running on port ${PORT}`);
});

module.exports = app;
