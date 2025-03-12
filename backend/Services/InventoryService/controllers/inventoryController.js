const Inventory = require("../models/Inventory");
// const Product = require("../../ProductService/models/Product");
const axios = require("axios"); // แต่ละบริการสื่อสารกันผ่าน API ไม่สามารถเรียกโมเดลได้โดยตรง


// ดึงสินค้าคงคลังทั้งหมด
exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("product");
    console.log(inventory);
    res.status(200).json(inventory);

  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};

// ดึงสินค้าคงคลังตาม ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate("product");
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};

exports.addInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("Received productId:", productId, "Quantity:", quantity);
    
    // เรียกใช้ API ของ ProductService เพื่อตรวจสอบสินค้า
    try {
      const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
      const product = productResponse.data;

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // คำนวณสถานะ
      const status = quantity > 0 ? "in_stock" : "out_of_stock";
      
      const newInventory = new Inventory({
        product: productId,
        quantity_in_stock: quantity,
        status: status
      });
      
      await newInventory.save();
      
      res.status(201).json({ message: "Inventory added successfully", inventory: newInventory });
    } catch (productError) {
      // ถ้าไม่พบสินค้า
      if (productError.response && productError.response.status === 404) {
        return res.status(404).json({ message: "Product not found" });
      }
      throw productError; // ส่งต่อข้อผิดพลาดไป catch ด้านนอก
    }
    
  } catch (error) {
    console.error("Error in addInventory:", error);
    res.status(500).json({ message: "Error adding inventory", error: error.message });
  }
};




// อัปเดตจำนวนสินค้าคงคลัง
exports.updateInventory = async (req, res) => {
    try {
      const { quantity } = req.body;
      const inventory = await Inventory.findById(req.params.id);
  
      if (!inventory) return res.status(404).json({ message: "Inventory not found" });
  
      inventory.quantity_in_stock = quantity;
      inventory.status = quantity === 0 ? "out_of_stock" : quantity < 5 ? "low_stock" : "in_stock";
      inventory.last_updated = Date.now();
  
      await inventory.save();
      
      res.json({ message: "Inventory updated", inventory });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// ลบสินค้าออกจากคลัง
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json({ message: "Inventory deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory", error: error.message });
  }
};
