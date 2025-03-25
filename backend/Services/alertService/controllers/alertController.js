const nodemailer = require('nodemailer');
const Alert = require('../models/alertModel'); // import model Alert


// ดึงแจ้งเตือนสินค้าทั้งหมด
exports.getAllAlerts = async (req, res) => {
    try {
        const query = {};
        if (req.query.code) {
            query.code = req.query.code; // ค้นหาตามรหัสสินค้า
        }

        const alerts = await Alert.find(query).sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({ message: "Failed to fetch alerts" });
    }
};

//ส่งเมล
const sendMail = async (mail, message) => {
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
            subject: "แจ้งเตือน",
            text: `${message}`
        }
        await transporter.sendMail(msg);

        console.log("Email sent successfully");
    } catch(error) {
        console.log(error.message);
    }
}

//เก็บ alert แล้วส่งเมล
exports.sendStockAlert = async (req, res) => {
    const { mail, code, stock } = req.body;
    const LOW_STOCK_THRESHOLD = 10;
    try {
        if (stock === 0) {
            type = 'out_of_stock';
            message = `สินค้ารหัส ${code} หมดสต็อกแล้ว!`;
        } else if (stock > 0 && stock <= LOW_STOCK_THRESHOLD) {
            type = 'low_stock';
            message = `สินค้ารหัส ${code} เหลือเพียง ${stock} ชิ้น!`;
        } else {
            return
        }

        const newAlert = new Alert({
            type,
            message,
            code,
            stock,
        });
        await newAlert.save();
        console.log('Create new alert');

        await sendMail(mail, message)

        res.status(201).json({ message: "Success to save alert" })
    } catch (error) {
        console.log('Error saving alert:', error);
        if (res && !res.headersSent) {
            res.status(500).json({ status: "error", message: "Failed to save alert" });
        }
    }
};

// ลบ alert
exports.deleteAlert = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAlert = await Alert.findByIdAndDelete(id);

        if (!deletedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        console.log('Alert deleted successfully');
        res.status(200).json({ message: "Alert deleted successfully" });
    } catch (error) {
        console.error('Error deleting alert:', error);
        res.status(500).json({ message: "Failed to delete alert" });
    }
};