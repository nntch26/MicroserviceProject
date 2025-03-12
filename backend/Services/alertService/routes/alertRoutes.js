
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { sendStockAlert } = require('../controllers/alertController');

// ตรวจสอบว่าเส้นทางนี้ถูกต้อง
router.post('/stock', sendEmail);


module.exports = router;
