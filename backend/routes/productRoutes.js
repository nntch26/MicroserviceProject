const express = require('express');
const router = express.Router();
const { addProduct, 
        getProduct,
        getAllProduct,
        deleteProduct,
        updateProduct ,
        getCategory
} = require('../controllers/productController');



// Route เพิ่มสินค้า
router.get('/products', getAllProduct);
router.get('/products/:sku', getProduct);
router.get('/categories/', getCategory);

router.post('/product/add', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);



module.exports = router;
