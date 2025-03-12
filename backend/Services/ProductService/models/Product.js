const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({

    sku: { type: String, required: true, unique: true },  // รหัสสินค้า
    name: { type: String, required: true },  // ชื่อสินค้า
    category: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',
        required: true
    },
    price: { type: Number, required: true },  // ราคา

    // status: { 
    //     type: String, 
    //     enum: ['Out of Stock',  'In Stock'], default: 'In Stock' 
    // }, //สถานะสินค้า
    last_updated: { 
        type: Date, 
        default: Date.now 
    }

   
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
