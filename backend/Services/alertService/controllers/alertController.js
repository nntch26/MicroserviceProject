const nodemailer = require('nodemailer');
const Alert = require('../models/alertModel'); // import model Alert

exports.sendStockAlert = async (req, res) => {
    const { code, stock } = req.body;
    const LOW_STOCK_THRESHOLD = 10;
    try {
        if (stock === 0) {
            type = 'out_of_stock';
            message = `🚨 สินค้ารหัส ${code} หมดสต็อกแล้ว!`;
        } else if (stock > 0 && stock <= LOW_STOCK_THRESHOLD) {
            type = 'low_stock';
            message = `⚠️ สินค้ารหัส ${code} เหลือเพียง ${stock} ชิ้น!`;
        }
    
        const newAlert = new Alert({
            type,
            message,
            code,
            stock,
        });
        await newAlert.save();
        console.log('✅ Create new alert');
    } catch (error) {
        console.log('❌ Error saving alert:', error);
        if (res && !res.headersSent) {
            res.status(500).json({ status: "error", message: "Failed to save alert" });
        }
    }
};