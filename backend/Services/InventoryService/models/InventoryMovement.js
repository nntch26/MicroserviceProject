const mongoose = require("mongoose");

const InventoryMovementSchema = new mongoose.Schema({
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory", 
    required: true
  },
  movement_type: {
    type: String,
    enum: ['IN', 'OUT'], // การเคลื่อนไหวประเภทต่าง ๆ
    required: true
  },
  quantity: { // จำนวนที่ลดหรือเพิ่ม
    type: Number,
    required: true,
  },

  reason: {
    type: String, 
    required: true // เช่น PURCHASE, SALE, RETURN
  },

  notes: {
    type: String,
    required: false // หมายเหตุเพิ่มเติม
  },

  performedBy: {
    type: String, 
    required: true // ใครเป็นคนทำรายการ 
  },

  balanceAfter: {
    type: Number,
    required: true 
  },
  
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const InventoryMovement = mongoose.model("InventoryMovement", InventoryMovementSchema);

module.exports = InventoryMovement;
