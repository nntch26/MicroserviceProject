const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    available_quantity: {
        type: Number,
        required: true,
    },
    last_updated: {
        type: Date,
        default: Date.now,
    },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
