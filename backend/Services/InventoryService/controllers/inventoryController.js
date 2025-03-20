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
          return { ...item._doc, product: productData.data, };// เพิ่มข้อมูล product เข้าไป

        } catch (error) {
          return { ...item._doc, product: null, }; // กรณีดึงไม่ได้ ให้ใส่ null

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
        productData = null; // ถ้าดึงไม่ได้ให้ใส่ null
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


// เพิ่ม product เข้า Inventory
exports.addInventory = async (req, res) => {
  try {
    const { productId, quantity, inventoryId } = req.body;
    console.log("productId:", productId, "Quantity:", quantity);
    
      newInventory = new Inventory({
        product: productId,
        quantity_in_stock: quantity,
        status: quantity > 0 ? "in_stock" : "out_of_stock"

      });

    await newInventory.save(); // บันทึกข้อมูล
    
    
    res.status(201).json({ message: "Product added to existing inventory", inventory: newInventory });


  } catch (error) {
    console.error("Error in addInventory:", error);
    res.status(500).json({ message: "Error adding inventory", error: error.message });
  }
};





// ลบคลัง
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






// เช็คว่ามี alert ซ้ำใน database หรือยัง
const checkAlertExists = async (code) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/alert/getstock?code=${code}`);
    return response.data.length > 0; // ถ้ามี alert อยู่แล้ว return true
  } catch (error) {
    console.error(`❌ Failed to check alert for product ${code}:`, error.message);
    return false; // ถ้ามีข้อผิดพลาดให้ return false
  }
};

// ฟังก์ชันแจ้งเตือนสินค้าคงคลังต่ำ
const sendLowStockAlerts = async (inventoryList) => {
  await Promise.all(
    inventoryList.map(async (inventoryItem) => {
      if (inventoryItem.product === null) {
        console.log('inventory have nothing')
      } else {
        try {
          const alreadyAlerted = await checkAlertExists(inventoryItem.product.product.code);

          if (!alreadyAlerted) {
            await axios.post("http://localhost:3002/api/alert/poststock", {
              mail: "65070177@kmitl.ac.th",
              code: inventoryItem.product.product.code,
              stock: inventoryItem.quantity_in_stock,
            });
            console.log(`✅ Alert sent for product ${inventoryItem.product.product.code}`);
          } else {
            console.log(`⚠️ Alert already exists for product ${inventoryItem.product.product.code}`);
          }
        } catch (alertError) {
          console.error(`❌ Failed to send alert for product ${inventoryItem.product.product.code}:`, alertError.message);
        }
      }

    })
  );
};