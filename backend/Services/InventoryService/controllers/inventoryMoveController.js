const Inventory = require('../models/Inventory');
const InventoryMovement = require('../models/InventoryMovement');
// const Product = require('./models/Product');
const axios = require("axios");



// ดึงรายการ InventoryMovement ทั้งหมด
exports.getAllMovements = async (req, res) => {
  try {
    const movements = await InventoryMovement.find().sort({ updated_at: -1 });

    // ดึงข้อมูลจาก API สำหรับแต่ละ movement
    const inventoryPromises = movements.map(async (movement) => {
      const inventoryId = movement.inventory;

      // ตรวจสอบว่า inventoryId มีค่า
      if (!inventoryId) {
        console.log(`No inventory ID found for movement with ID ${movement._id}`);
        return { ...movement._doc, inventory: null }; 
      }

      try {
        // ดึงข้อมูล inventory จาก API
        const response = await axios.get(`http://localhost:8080/apiInventory/inventory/${inventoryId}`);

        // ตรวจสอบว่า API ส่งข้อมูลกลับมาหรือไม่
        if (response.status === 200 && response.data) {
          console.log(`Successfully fetched inventory for movement ID ${movement._id}`);
          
          // แทนที่ inventory ด้วยข้อมูลที่ดึงมา
          return { ...movement._doc, inventory: response.data };
        } else {
          console.error(`Failed to fetch inventory for ID ${inventoryId}, status code: ${response.status}`);
          return { ...movement._doc, inventory: null }; // หากไม่สามารถดึงข้อมูลได้ ให้เป็น null
        }

      } catch (error) {
        console.error(`Error fetching inventory for ID ${inventoryId}:`, error);
        return { ...movement._doc, inventory: null }; 
      }
    });

    const enrichedMovements = await Promise.all(inventoryPromises);
    res.status(200).json(enrichedMovements);

  } catch (error) {
    console.error("Error fetching inventory movements:", error);
    res.status(500).json({ message: "Error fetching inventory movements", error: error.message });
  }
};



// สร้างรายการ inventoryMovement 
exports.createInventoryMovement = async (req, res) => {

  try {
    const { inventory, movement_type, quantity, reason, notes, performedBy } = req.body;

    // ค้นหา Inventory 
    const getInventory = await Inventory.findById(inventory);
    if (!getInventory) {
      return res.status(404).json({ success: false, message: "Inventory not found" });
    }

    console.log("ค้นหา Inventory ", getInventory)

     // คำนวณ balanceAfter ตาม movement_type
     let newBalance;

     if (movement_type === "IN") {
       newBalance = getInventory.quantity_in_stock + quantity; // เพิ่มจำนวนสินค้า

     } else if (movement_type === "OUT") {

       if (getInventory.quantity_in_stock < quantity) {
         return res.status(400).json({ 
          success: false, message: "Not enough inventory" });
       }
       newBalance = getInventory.quantity_in_stock - quantity; // ลดจำนวนสินค้า

     } else {
       return res.status(400).json({ 
        success: false, message: "Invalid movement type" });
     }

    // อัปเดตค่า quantity ใน Inventory
    getInventory.quantity_in_stock = newBalance;

    // อัปเดตสถานะ
    if (newBalance === 0) {
      getInventory.status = "out_of_stock";
    } else if (newBalance <= 10) {
      getInventory.status = "low_stock";
    } else {
      getInventory.status = "in_stock";
    }

    await getInventory.save();
    console.log("balance", newBalance)

    // บันทึกข้อมูล movement
    const newMovement = new InventoryMovement({
      inventory,
      movement_type,
      quantity,
      reason,
      notes,
      performedBy,
      balanceAfter: newBalance, // ค่าคงเหลือ
    });

    const savedMovement = await newMovement.save();

    res.status(201).json({ data: savedMovement });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating inventory movement", error });
  }
}



// ดึงรายการ InventoryMovement เฉพาะของ inventoryId ที่เลือก
exports.getMovementsByInventoryId = async (req, res) => {
  try {
    const { inventoryId } = req.params; // ดึง inventoryId จาก URL parameter
    console.log("inventoryId", inventoryId)

    if (!inventoryId) {
      return res.status(400).json({ message: "Inventory ID is required" });
    }

    // ดึง InventoryMovement ที่มี inventoryId ตรงกับที่เลือก
    const movements = await InventoryMovement.find({ inventory: inventoryId }).sort({ updated_at: -1 });

    if (!movements.length) {
      return res.status(404).json({ message: `No movements found for inventory ID ${inventoryId}` });
    }

    // ดึงข้อมูลจาก API สำหรับแต่ละ movement
    const inventoryPromises = movements.map(async (movement) => {
      // ตรวจสอบว่า inventoryId มีค่า
      if (!movement.inventory) {
        console.log(`No inventory ID found for movement with ID ${movement._id}`);
        return { ...movement._doc, inventory: null }; 
      }

      try {
        // ดึงข้อมูล inventory จาก API
        const response = await axios.get(`http://localhost:8080/apiInventory/inventory/${movement.inventory}`);

        // ตรวจสอบว่า API ส่งข้อมูลกลับมาหรือไม่
        if (response.status === 200 && response.data) {
          console.log(`Successfully fetched inventory for movement ID ${movement._id}`);
          // แทนที่ inventory ด้วยข้อมูลที่ดึงมา
          return { ...movement._doc, inventory: response.data };
        } else {
          console.error(`Failed to fetch inventory for ID ${movement.inventory}, status code: ${response.status}`);
          return { ...movement._doc, inventory: null };
        }

      } catch (error) {
        console.error(`Error fetching inventory for ID ${movement.inventory}:`, error);
        return { ...movement._doc, inventory: null }; 
      }
    });

    const enrichedMovements = await Promise.all(inventoryPromises);
    res.status(200).json(enrichedMovements);

  } catch (error) {
    console.error("Error fetching inventory movements:", error);
    res.status(500).json({ message: "Error fetching inventory movements", error: error.message });
  }
};
