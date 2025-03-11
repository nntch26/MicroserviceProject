const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name:{type:String,require:true},
    sku:{type:String,unique: true, required: true},
    quantity:{type:Number,default:0},
    category: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',
        required: true
    },
    price: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Out of Stock', 'Low Stock', 'In Stock'], default: 'In Stock' 
    }, //สถานะสินค้า
    last_updated: { 
        type: Date, 
        default: Date.now 
    }

   
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
