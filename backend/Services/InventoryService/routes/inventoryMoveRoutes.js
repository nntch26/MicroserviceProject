const express = require("express");
const router = express.Router();
const inventoryMoveController = require("../controllers/inventoryMoveController");

// inventory movement

router.get("/", inventoryMoveController.getAllMovements);
router.post("/create", inventoryMoveController.createInventoryMovement)

// router.post("/in", inventoryMoveController.addInventory);
// router.post("/out", inventoryMoveController.removeInventory);


module.exports = router;
