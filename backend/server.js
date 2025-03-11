//server.js

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParse = require("body-parser");

const app = express()
app.use(express.json());


dotenv.config();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(bodyParse.json())
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
);

// Routes
app.get("/", (req, res) => {
    res.send("Hello World, Backend API");
});

// Routes
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';

  

app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/categoryRoutes'));


// Start server
app.listen(port, () => {
  
    console.log("-------------------------")
    console.log(`Server is running on port: ${port}`);
});

