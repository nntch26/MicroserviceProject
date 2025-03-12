const nodemailer = require('nodemailer');
const Alert = require('../models/alertModel'); // import model Alert

// ฟังก์ชันสร้างแจ้งเตือน
const LOW_STOCK_THRESHOLD = 10;
let alertType = '';
let message = '';
const createStockAlert = async (sku, stock) => {

    if (stock === 0) {
        alertType = 'out_of_stock';
        message = `🚨 สินค้ารหัส ${sku} หมดสต็อกแล้ว!`;
    } else if (stock > 0 && stock <= LOW_STOCK_THRESHOLD) {
        alertType = 'low_stock';
        message = `⚠️ สินค้ารหัส ${sku} เหลือเพียง ${stock} ชิ้น!`;
    }

    const newAlert = new Alert({
        type: alertType,
        message: message,
        sku: sku,
        stock: stock,
    });

    try {
        await newAlert.save();
        console.log('Create new alert');
    } catch (error) {
        console.log('Error saving alert:', error);
    }
};


exports.sendStockAlert = async (req, res) => {
    // อ่านอีเมลจาก request body
    const { email, sku, stock } = req.body;
    // สร้างการแจ้งเตือนเกี่ยวกับสต็อก
    await createStockAlert(sku, stock);
    try {
        // ตั้งค่า transporter สำหรับส่งอีเมล
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        // กำหนดข้อมูลอีเมล
        const msg = {
            to: `${email}`,
            subject: "env test",
            text: `${message}`
        };

        // ส่งอีเมล
        await transporter.sendMail(msg);
        console.log("✅ Email sent successfully");

        // ส่งการตอบกลับหลังจากสร้างการแจ้งเตือนและส่งอีเมล
        res.send({ status: "success", message: "Email sent successfully and stock alert created" });

    } catch (error) {
        console.log(error.message);
        // ตรวจสอบการตอบกลับที่เคยส่งไปแล้ว
        if (!res.headersSent) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
};