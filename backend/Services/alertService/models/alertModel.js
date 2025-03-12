const mongoose = require('mongoose');

// สร้าง schema สำหรับ Alert
const alertSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['out_of_stock', 'low_stock'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// สร้างและ export model
const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;