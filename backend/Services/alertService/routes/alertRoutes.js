
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { sendStockAlert, getAllAlerts } = require('../controllers/alertController');

// ตรวจสอบว่าเส้นทางนี้ถูกต้อง
router.post('/stock', sendStockAlert);
router.get('/getstock',getAllAlerts);


module.exports = router;
