const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParse = require("body-parser");

const User = require("./models/User");

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


app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/categoryRoutes'));


// app.get("/api/hello", (req,res) => {
//     res.json({ message: "Hello" });
// });

// // สร้างผู้ใช้ใหม่
// app.post("/users", async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });


// Start server
app.listen(port, () => {
  
    console.log("-------------------------")
    console.log(`Server is running on port: ${port}`);
});

