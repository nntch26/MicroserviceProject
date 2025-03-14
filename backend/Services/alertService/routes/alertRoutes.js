
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { sendStockAlert, getAllAlerts,deleteAlert } = require('../controllers/alertController');

// ตรวจสอบว่าเส้นทางนี้ถูกต้อง
router.post('/poststock', sendStockAlert);
router.get('/getstock',getAllAlerts);
router.delete('/deletealert/:id', deleteAlert);

module.exports = router;
