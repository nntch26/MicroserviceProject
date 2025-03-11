// product-service/src/app.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const connectDB = require("../config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Product Service is running' });
});

// Routes
app.use('/products', productRoutes);



module.exports = app;