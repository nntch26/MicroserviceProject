const express = require("express");
const router = express.Router();
const inventoryMoveController = require("../controllers/inventoryMoveController");

// inventory movement


router.post("/add", inventoryMoveController.addInventory);
router.post("/remove", inventoryMoveController.removeInventory);


module.exports = router;
