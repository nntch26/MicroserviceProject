

const express = require('express');
const cors = require('cors');
const alertRoutes = require('./routes/alertRoutes');
// const connectDB = require("../../config/db");
const mongoose = require("mongoose");

require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
MONGO_URL="mongodb://localhost:27017/alertdb" // ชื่อฐานข้อมูล

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
  } catch (error) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      process.exit(1);
  }
};

connectDB();

// check endpoint
app.get('/endpoint', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Alert Service is running' });
});

// Routes
app.use('/api/alert', alertRoutes);


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Alert Service is running on port ${PORT}`);
});

module.exports = app;
