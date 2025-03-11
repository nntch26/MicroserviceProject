const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    try {
        const { email } = req.body
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
            to: `${email}`,
            subject: "env test",
            text: "โปรดอย่าตกใจ นี่คือการทดสอบส่ง gmail ของวิชา Micro โดยการใช้ nodemailer"
        }
        await transporter.sendMail(msg);

        console.log("✅ Email sent successfully");
        res.send({ status: "success", message: "Email sent successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
};