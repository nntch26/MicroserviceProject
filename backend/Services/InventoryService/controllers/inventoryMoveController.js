const Inventory = require('../models/Inventory');
const InventoryMovement = require('../models/InventoryMovement');
// const Product = require('./models/Product');
const axios = require("axios");


// เพิ่มจำนวนสินค้า
exports.addInventory = async (req, res) => {
  try {
    const { productId, quantity, source } = req.body;
    
    // ค้นหาสินค้าใน Inventory
    const inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      // ถ้าไม่มีสินค้าใน Inventory ให้สร้างใหม่
      const status = quantity > 0 ? "in_stock" : "out_of_stock";

      const newInventory = new Inventory({
        product: productId,
        quantity_in_stock: quantity,
        status: status
      });

      await newInventory.save();

    } else {
      // ถ้ามีสินค้าใน Inventory ให้เพิ่มจำนวนสินค้า
      console.log('inventory:', inventory);
      inventory.quantity_in_stock += quantity;
      inventory.status = inventory.quantity_in_stock > 0 ? "in_stock" : "out_of_stock";  // อัปเดตสถานะ

      await inventory.save();
    }

    // บันทึก log การเพิ่มสินค้าใน InventoryMovement
    const movement = new InventoryMovement({
      product: productId,
      movement_type: "ADD",
      quantity: quantity,
      source: source,  // แหล่งที่มา
      destination: null,  // ปลายทาง (ไม่มีในกรณีเพิ่ม)
      timestamp: new Date()  // เวลาที่เกิดเหตุการณ์
    });

    await movement.save();

    res.status(200).json({ message: 'Inventory added and movement recorded.', movement: movement });


  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory', error: error.message });
  }
};




// ลดจำนวนสินค้า
exports.removeInventory = async (req, res) => {
  try {
    const { productId, quantity, destination } = req.body;
    
    // ค้นหาสินค้าใน Inventory
    const inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      return res.status(404).json({ message: 'Product not found in inventory' });
    }

    // เช็คว่า จำนวนสินค้าที่ต้องการลด > จำนวนสินค้าที่มีป่าว
    if (inventory.quantity_in_stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock to remove' });
    }

    // ลดจำนวนสินค้า
    inventory.quantity_in_stock -= quantity;
    inventory.status = inventory.quantity_in_stock > 0 ? "in_stock" : "out_of_stock";  // อัปเดตสถานะ

    await inventory.save();

    // บันทึกประวัติการลดสินค้าใน InventoryMovement
    const movement = new InventoryMovement({
      product: productId,
      movement_type: "REMOVE",
      quantity: quantity,
      source: null,  // แหล่งที่มา 
      destination: destination,  // ปลายทาง (สถานที่ที่สินค้าส่งไป)
      timestamp: new Date()  // เวลาที่เกิดเหตุการณ์
    });

    await movement.save();

    res.status(200).json({ message: 'Inventory updated and movement recorded.', movement: movement });
  } catch (error) {
    res.status(500).json({ message: 'Error removing inventory', error: error.message });
  }
};



// ดึงรายการ InventoryMovement ทั้งหมด
exports.getAllMovements = async (req, res) => {
  try {
    const movements = await InventoryMovement.find(); // ดึงรายการ Movement ทั้งหมด

    // ดึงข้อมูลสินค้าจาก Product Service ผ่าน API ทีละตัว
    const movementsWithProducts = await Promise.all(
      movements.map(async (item) => {

        try {

          const response = await axios.get(`http://localhost:3001/api/products/${item.product}`);
          return { ...item._doc, product: response.data }; // เพิ่มข้อมูลสินค้า

        } catch (error) {

          console.error(`Error fetching product ${item.product}:`, error.message);
          return { ...item._doc, product: { error: "Product not found" } }; // กรณีดึงไม่ได้

        }
      })
    );

    res.status(200).json(movementsWithProducts);
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory movements", error: error.message });
  }
};



// ฟังก์ชันโอนย้ายสินค้า
// exports.transferInventory = async (req, res) => {
//   try {
//     const { productId, quantity, source, destination } = req.body;

//     // ค้นหาสินค้าใน Inventory
//     const inventory = await Inventory.findOne({ product: productId });

//     if (!inventory) {
//       return res.status(404).json({ message: 'Product not found in inventory' });
//     }

//     if (inventory.quantity_in_stock < quantity) {
//       return res.status(400).json({ message: 'Not enough stock to transfer' });
//     }

//     // ลดจำนวนสินค้าที่ต้นทาง
//     inventory.quantity_in_stock -= quantity;
//     inventory.status = inventory.quantity_in_stock > 0 ? "in_stock" : "out_of_stock";  // อัปเดตสถานะ

//     await inventory.save();

//     // บันทึกการโอนย้ายใน InventoryMovement
//     const movementFrom = new InventoryMovement({
//       product: productId,
//       movement_type: "TRANSFER",
//       quantity: quantity,
//       source: source,  // แหล่งที่มา
//       destination: destination,  // ปลายทาง 
//       timestamp: new Date()  // เวลาที่เกิดเหตุการณ์
//     });

//     await movementFrom.save();

//     // อัปเดตสถานะของสินค้าคลังปลายทาง (โอนย้าย)
//     let toInventory = await Inventory.findOne({ product: productId, location: toLocation });

//     if (!toInventory) {
//       toInventory = new Inventory({
//         product: productId,
//         quantity_in_stock: quantity,
//         location: toLocation,
//         status: "in_stock"
//       });
//       await toInventory.save();
//     } else {
//       toInventory.quantity_in_stock += quantity;
//       toInventory.status = toInventory.quantity_in_stock > 0 ? "in_stock" : "out_of_stock";
//       await toInventory.save();
//     }

//     res.status(200).json({ message: 'Inventory updated and transfer recorded.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error transferring inventory', error: error.message });
//   }
// };
