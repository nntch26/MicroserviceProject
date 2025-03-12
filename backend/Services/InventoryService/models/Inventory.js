const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  quantity_in_stock: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["in_stock", "out_of_stock" , "low_stock"], 
    default: "in_stock" 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
