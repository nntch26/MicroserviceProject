const mongoose = require("mongoose");

const InventoryMovementSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true
  },
  movement_type: {
    type: String,
    enum: ["ADD", "REMOVE", "TRANSFER"], // การเคลื่อนไหวประเภทต่าง ๆ
    required: true
  },
  quantity: { // จำนวนที่ลดหรือเพิ่ม
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: false, // ต้นทาง
  },
  destination: {
    type: String,
    required: false, //  ปลายทาง (สถานที่ที่สินค้าไป)
  },
 
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const InventoryMovement = mongoose.model("InventoryMovement", InventoryMovementSchema);

module.exports = InventoryMovement;
