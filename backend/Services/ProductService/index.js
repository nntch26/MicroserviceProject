// index.js productservice

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
// const connectDB = require("../../config/db");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
MONGO_URL="mongodb://localhost:27017/productdb" // ชื่อฐานข้อมูล

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
  res.status(200).json({ status: 'OK', message: 'Product Service is running' });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});

module.exports = app;
