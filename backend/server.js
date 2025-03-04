const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const app = express()
app.use(express.json());


app.get("/api/hello", (req,res) => {
    res.json({ message: "Hello" });
});

// สร้างผู้ใช้ใหม่
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready " + "and Server is Listening on Port ", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occurred while"+ " connecting to database."+ err);    
})