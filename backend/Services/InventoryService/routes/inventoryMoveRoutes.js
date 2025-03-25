const express = require("express");
const router = express.Router();
const inventoryMoveController = require("../controllers/inventoryMoveController");

// inventory movement

router.get("/", inventoryMoveController.getAllMovements);
router.get("/:inventoryId", inventoryMoveController.getMovementsByInventoryId)

router.post("/create", inventoryMoveController.createInventoryMovement)



module.exports = router;
