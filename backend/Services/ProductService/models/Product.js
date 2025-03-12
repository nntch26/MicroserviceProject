const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({

    code: { type: String, required: true, unique: true },  // รหัสสินค้า

    name: { type: String, required: true },  // ชื่อสินค้า
    
    category: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',
        required: true
    },
    price: { type: Number, required: true },  // ราคา

    last_updated: { 
        type: Date, 
        default: Date.now 
    }

   
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
