
const express = require('express');
const router = express.Router();
const { addProduct, 
        getProduct, 
        getAllProduct, 
        deleteProduct, 
        updateProduct
} = require('../controllers/productController');

// Route เพิ่มสินค้า
router.get('/', getAllProduct); 
router.get('/:sku', getProduct);
router.post('/add', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

