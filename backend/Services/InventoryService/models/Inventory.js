const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity_in_stock: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ["in_stock", "low_stock", "out_of_stock"],
    default: "out_of_stock"
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Inventory", InventorySchema);