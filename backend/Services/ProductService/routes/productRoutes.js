
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route เพิ่มสินค้า
router.get('/', productController.getAllProduct); 
// search
router.get('/search', productController.searchProduct);

// get product by id
router.get('/:id', productController.getProduct);


router.post('/add', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);



module.exports = router;

