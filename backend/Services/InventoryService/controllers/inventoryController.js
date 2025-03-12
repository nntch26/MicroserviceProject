const Inventory = require("../models/Inventory");
// const Product = require("../../ProductService/models/Product");
const axios = require("axios"); // แต่ละบริการสื่อสารกันผ่าน API ไม่สามารถเรียกโมเดลได้โดยตรง


// ดึงสินค้าคงคลังทั้งหมด
exports.getAllInventory = async (req, res) => {
  try {
    // const inventory = await Inventory.find().populate("product");

    const inventory = await Inventory.find(); // ดึงข้อมูล Inventory ทั้งหมด

    

    // ดึงข้อมูลสินค้าจาก ProductService ทีละตัว
    const getAllinventory = await Promise.all(
      inventory.map(async (item) => {
        try {
          const productData = await axios.get(`http://localhost:3001/api/products/${item.product}`);
          return {
            ...item._doc,
            product: productData.data, // เพิ่มข้อมูล product เข้าไป
          };
        } catch (error) {
          return {
            ...item._doc,
            product: null, // กรณีดึงไม่ได้ ให้ใส่ null
          };
        }
      })
    );
   
    // เรียกใช้ฟังก์ชันแจ้งเตือนสินค้าคงคลังต่ำ
    sendLowStockAlerts(getAllinventory);

    console.log(getAllinventory);
    res.status(200).json(getAllinventory);

  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};



// ดึงสินค้าคงคลังตาม ID
exports.getInventoryById = async (req, res) => {
  try {
    // ค้นหา Inventory ตาม ID
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: "ไม่พบข้อมูล Inventory" });
    }

    // ตรวจสอบว่า inventory มี product หรือไม่
    if (inventory.product) {
      try {
        const getproductData = await axios.get(`http://localhost:3001/api/products/${inventory.product}`);
        productData = getproductData.data; // ดึงข้อมูลสินค้า

      } catch (error) {
        console.error(`Error fetching product ${inventory.product}:`, error.message);
        productData = { error: "Product not found or service unavailable" }; // ข้อผิดพลาด
      }
    }



    // รวมข้อมูล Inventory และ Product
    const getinventory = {
      ...inventory._doc,
      product: productData, // แทนที่ product ID ด้วยข้อมูลจริง
    };

    res.status(200).json(getinventory);


  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};


// เพิ่ม Inventory
exports.addInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("Received productId:", productId, "Quantity:", quantity);
    
    // เรียกใช้ API ของ ProductService เพื่อตรวจสอบสินค้า
    const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
    const product = productResponse.data;

    // ถ้าไม่พบสินค้า
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
    
    res.status(201).json({ message: "Inventory เพิ่มข้อมูลสำเร็จ!", inventory: newInventory });

    
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


// ฟังก์ชันแจ้งเตือนสินค้าคงคลังต่ำ
const sendLowStockAlerts = async (inventoryList) => {
  const lowStockItems = inventoryList.filter((item) => item.quantity_in_stock < 6);

  await Promise.all(
    lowStockItems.map(async (lowStockItem) => {
      try {
        await axios.post("http://localhost:3002/api/alert/stock", {
          code: lowStockItem.product.data.code,
          stock: lowStockItem.quantity_in_stock,
        });
        console.log(`✅ Alert sent for product ${lowStockItem.product.data.code}`);
      } catch (alertError) {
        console.error(`❌ Failed to send alert for product ${lowStockItem.product.data.code}:`, alertError.message);
      }
    })
  );
};