const nodemailer = require('nodemailer');
const Alert = require('../models/alertModel'); // import model Alert

const sendMail = async (mail) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const msg = {
            to: `${mail}`,
            subject: "env test",
            text: "โปรดอย่าตกใจ นี่คือการทดสอบส่ง gmail ของวิชา Micro โดยการใช้ nodemailer"
        }
        await transporter.sendMail(msg);

        console.log("✅ Email sent successfully");
    } catch(error) {
        console.log(error.message);
    }
}

exports.sendStockAlert = async (req, res) => {
    const { mail, code, stock } = req.body;
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

        await sendMail(mail)

        res.status(201).json({ message: "Success to save alert" })
    } catch (error) {
        console.log('❌ Error saving alert:', error);
        if (res && !res.headersSent) {
            res.status(500).json({ status: "error", message: "Failed to save alert" });
        }
    }
};