const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    sku:{
        type:String,
        unique: true, 
        required: true
    },

    quantity:{
        type:Number,
        default:0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    
    price: { 
        type: Number, 
        required: true 
    },
    
    expiration_date: { type: Date }, //วันหมดอายุ

    status: { 
        type: String, 
        enum: ['available', 'out of stock'], default: 'available' 
    }, //สถานะสินค้า

    last_updated: { 
        type: Date, 
        default: Date.now 
    }

   
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
