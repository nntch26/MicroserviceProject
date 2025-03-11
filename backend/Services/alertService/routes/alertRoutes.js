
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { sendEmail } = require('../controllers/alertController');

// ตรวจสอบว่าเส้นทางนี้ถูกต้อง
router.post('/email', sendEmail);


module.exports = router;
