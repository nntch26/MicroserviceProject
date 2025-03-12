// // config/db.js
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// MONGO_URL="mongodb://localhost:27017/mymicrodb"

// const connectDB = async () => {
//   try {
//       const conn = await mongoose.connect(MONGO_URL);
//       console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      
//   } catch (error) {
//       console.error(`❌ MongoDB Connection Error: ${error.message}`);
//       process.exit(1);
//   }
// // };

// module.exports = connectDB;

