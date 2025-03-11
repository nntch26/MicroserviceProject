// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();

const { getCategory } = require('../controllers/categoryController');

// ตรวจสอบว่าเส้นทางนี้ถูกต้อง
router.get('/categories', getCategory);


module.exports = router;
