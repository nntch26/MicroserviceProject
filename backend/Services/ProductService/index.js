// index.js productservice

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const connectDB = require("../../config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Product Service is running' });
});

// Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});

module.exports = app;
