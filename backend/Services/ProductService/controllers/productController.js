const Product = require('../models/Product');
const Category = require('../models/Category');  
const axios = require("axios"); // เรียก API ข้างนอก


// เพิ่มสินค้าใหม่
exports.addProduct = async (req, res) => {
    try {
        const { name, code, category, price } = req.body;

        // ตรวจสอบว่าสินค้านี้มีอยู่แล้วหรือป่าว
        const getProduct = await Product.findOne({ code });
        if (getProduct) {
            return res.status(400).json({ massage: 'Code นี้มีอยู่แล้ว' });
        }

        // ตรวจสอบ category
        const getcategory = await Category.findOne({ _id: category });
        if (!getcategory) {
            return res.status(400).json({ massage: 'ไม่มี category นี้' });
        }

        // สร้างสินค้าใหม่
        const newProduct = new Product({
            name,
            code,
            category,
            price,
        });

        // บันทึกลงฐานข้อมูล
        await newProduct.save();

        res.status(201).json({ massage: 'Product added successfully', product: newProduct });

    } catch (error) {
        console.log(error.massage)
        res.status(500).json({ status: "error", 
            massage: "เกิดข้อผิดพลาด  ", error
        });
    }
};




// ดูรายละเอียดสินค้า แต่ละตัว
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // ค้นหาข้อมูลจาก id
        const product = await Product.findOne({ _id: id }).populate('category', 'name') 

        console.log("id ->",id)

        console.log("getProduct",product)

        if (!product) return res.status(404).json(
            { status: "error", 
            massage: "Product not found" 
            });

        res.status(200).json({ product });

    } catch (error) {
        console.log(error.massage)
        res.status(500).json({ status: "error", massage: error.massage });
    }
};


// ดึงข้อมูลสินค้า วัสดุ ทั้งหมด
exports.getAllProduct = async (req, res) => {
    try {
        
        const product = await Product.find().populate('category', 'name'); 

        console.log("getAllProduct",product)

        if (!product || product.length === 0) {
            return res.status(404).json({ status: "error", massage: "ไม่พบข้อมูลสินค้า" });
        }

        res.status(200).json({ data: product });


    } catch (error) {
        console.log(error.massage)
        res.status(500).json({ status: "error", massage: error.massage });
    }
};





// แก้ไขข้อมูลสินค้า
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, category, price } = req.body; 

        console.log("id ->", id);

        // อัปเดตข้อมูลสินค้า
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(code && { code }),
                ...(category && { category }),
                ...(price && { price }),
                last_updated: Date.now() // อัปเดตเวลาการแก้ไข
            },
            { new: true, runValidators: true } // คืนค่าที่อัปเดตและตรวจสอบ validation
        );

        if (!updateProduct) {
            return res.status(404).json({
                status: "error",
                message: "ไม่พบข้อมูลสินค้าที่ต้องการแก้ไข"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            // product: updateProduct
        });

    } catch (error) {
        console.log(error.message); 
        res.status(500).json({ status: "error", message: error.message });
    }
};


// ลบสินค้า
exports.deleteProduct = async (req, res) => {

    try{
        const { id } = req.params
        console.log("Product ID:", id);


        // เรียก API เพื่อลบ Inventory ที่เกี่ยวข้องกับ product นี้

        try {
            await axios.delete(`http://localhost:3003/api/inventory/${id}`);
            console.log("Inventory deleted successfully.");
        } catch (inventoryError) {
            console.error("Error deleting inventory:", inventoryError.message);
        }


        const inventories = await axios.get(`http://localhost:3002/api/inventory/product/${id}`);

        if (inventories.data.length > 0) {
            // 🔹 ลบ Inventory ที่เกี่ยวข้องก่อน
            await axios.delete(`http://localhost:3002/api/inventory/product/${id}`);
        }

        const deleteProduct = await Product.findByIdAndDelete(id)
        if(!deleteProduct){
            res.status(404).json({
                status:"error",
                massage:"ไม่พบข้อมูลสินค้าที่ต้องการลบ"
            })
        }

        // เรียก API เพื่อลบ Inventory ที่เกี่ยวข้องกับ product นี้
        try {
            await axios.delete(`http://localhost:3003/api/inventory/${id}`);
            console.log("Inventory deleted successfully.");
        } catch (inventoryError) {
            console.error("Error deleting inventory:", inventoryError.message);
        }


        res.status(200).json({ massage: "Product deleted successfully" });

    }catch(error){
        console.log(error.massage)
        res.status(500).json({ status: "error", massage: error.massage });
    }
   
};

