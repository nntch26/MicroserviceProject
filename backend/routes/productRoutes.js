const express = require('express');
const router = express.Router();
const { addProduct, 
        getProduct,
        getAllProduct 
} = require('../controllers/productController');



// Route เพิ่มสินค้า
router.post('/product/add', addProduct);
router.get('/products', getAllProduct);
router.get('/products/:sku', getProduct);



module.exports = router;
