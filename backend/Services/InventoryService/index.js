// index.js productservice

const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventoryRoutes');
const connectDB = require("../../config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// check endpoint
app.get('/endpoint', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'inventory Service is running' });
});

// Routes
app.use('api/inventory', inventoryRoutes);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Inventory Service is running on port ${PORT}`);
});

module.exports = app;
