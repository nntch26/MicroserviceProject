const express = require("express");
const router = express.Router();
const inventoryMoveController = require("../controllers/inventoryMoveController");

// inventory movement

router.get("/", inventoryMoveController.getAllMovements);

router.post("/source", inventoryMoveController.addInventory);
router.post("/destination", inventoryMoveController.removeInventory);


module.exports = router;
