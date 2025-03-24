const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

require('dotenv').config();
const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy routes
const PRODUCT_SERVICE_URL = "http://localhost:3001";
const ALERT_SERVICE_URL = "http://localhost:3002";
const INVENTORY_SERVICE_URL = "http://localhost:3003";

app.use("/apiProducts", proxy(PRODUCT_SERVICE_URL));
app.use("/apiAlerts", proxy(ALERT_SERVICE_URL));
app.use("/apiInventory", proxy(INVENTORY_SERVICE_URL));

// Test route
app.get("/", (req, res) => {
  res.send("Hello World, Backend API");
});

// Start server
app.listen(port, () => {
  console.log("-------------------------");
  console.log(`Server is running on port: ${port}`);
});
