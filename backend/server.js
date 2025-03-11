const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { spawn } = require("child_process");  // ใช้ module นี้เพื่อรัน process อื่นๆ

dotenv.config();
const app = express();
const port = 8002;

// รัน index.js ของ Product Service
const productService = spawn('node', ['index.js'], {
  cwd: '/Services/inventoryservice/index.js',  // แก้ไขให้ตรงกับที่เก็บไฟล์ productservice
  stdio: 'inherit'  // ให้แสดงผลลัพธ์ใน Terminal เดียวกัน
});

productService.on('error', (err) => {
  console.error("Error while starting Product Service:", err);
});

productService.on('exit', (code) => {
  console.log(`Product Service exited with code ${code}`);
});

// กำหนด CORS และ middleware อื่นๆ
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json());

// Proxy API ไปที่ Product Service
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3001";
app.use("/api/products", createProxyMiddleware({ target: PRODUCT_SERVICE_URL, changeOrigin: true }));

// Check route
app.get("/", (req, res) => {
  res.send("Hello World, Backend API");
});

// Start server
app.listen(port, () => {
  console.log("-------------------------");
  console.log(`Server is running on port: ${port}`);
});
