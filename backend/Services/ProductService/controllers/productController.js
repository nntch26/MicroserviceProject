const Product = require('../models/Product');
const Category = require('../models/Category');  
const axios = require("axios"); // เรียก API ข้างนอก
const moment = require("moment-timezone");


// เพิ่มสินค้าใหม่
exports.addProduct = async (req, res) => {
    try {
        const { name, code, category, price } = req.body;

        // ตรวจสอบว่าสินค้านี้มีอยู่แล้วหรือป่าว
        const getProduct = await Product.findOne({ code });
        if (getProduct) {
            return res.status(400).json({ message: 'Code นี้มีอยู่แล้ว' });
        }

        // ตรวจสอบ category
        const getcategory = await Category.findOne({ _id: category });
        if (!getcategory) {
            return res.status(400).json({ message: 'ไม่มี category นี้' });
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

        res.status(201).json({ message: 'Product added successfully', product: newProduct });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "error", 
            message: "เกิดข้อผิดพลาด  ", error
        });
    }
};




// ดูรายละเอียดสินค้า แต่ละตัว
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // ค้นหาข้อมูลจาก id
        const product = await Product.findOne({ _id: id })
                        .populate('category', 'name').lean(); 

        console.log("id ->",id)

        console.log("getProduct",product)

        if (!product) return res.status(404).json(
            { status: "error", 
            message: "Product not found" 
            });
        
        // // แปลงเวลา
        // const product = Array.of(getproduct).map((product) => ({
        //     ...product,
        //     last_updated: moment(product.last_updated)
        //         .tz("Asia/Bangkok")
        //         .format("HH:mm:ss - DD MMM YYYY"),
        // }));

        // console.log(product);

        res.status(200).json({ product });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
};


// ดึงข้อมูลสินค้า วัสดุ ทั้งหมด
exports.getAllProduct = async (req, res) => {
    try {
        
        const allproduct = await Product.find().populate('category', 'name').lean(); 

        console.log("getAllProduct",allproduct)

        if (!allproduct || allproduct.length === 0) {
            return res.status(404).json({ status: "error", message: "ไม่พบข้อมูลสินค้า" });
        }

        // // แปลงเวลา
        // const modifiedProducts = allproduct.map((product) => ({
        //     ...product,
        //     last_updated: moment(product.last_updated)
        //         .tz("Asia/Bangkok")
        //         .format("HH:mm:ss - DD MMM YYYY"),
        // }));

        // console.log(modifiedProducts);


        res.status(200).json({ data: allproduct });


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "error", message: error.message });
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


        const deleteProduct = await Product.findByIdAndDelete(id)
        if(!deleteProduct){
            res.status(404).json({
                status:"error",
                message:"ไม่พบข้อมูลสินค้าที่ต้องการลบ"
            })
        }

        res.status(200).json({ massage: "Product deleted successfully" });

    }catch(error){
        console.log(error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
   
};

// ค้นหาสินค้า
exports.searchProduct = async (req, res) => {
    try {
        const { query } = req.query;
        console.log("query ->", query);

        // ค้นหาสินค้า
        const searchProduct = await Product.find({
            $or: [
              { name: { $regex: query, $options: 'i' } }, // ค้นหาจาก name
              { code: { $regex: query, $options: 'i' } }  // ค้นหาจาก code
            ]
          })
            .populate('category', 'name')
            .lean();

        if (!searchProduct || searchProduct.length === 0) {
            return res.status(404).json({ status: "error", message: "ไม่พบข้อมูลสินค้า" });
        }

        // // แปลงเวลา
        // const modifiedProducts = searchProduct.map((product) => ({
        //     ...product,
        //     last_updated: moment(product.last_updated)
        //         .tz("Asia/Bangkok")
        //         .format("HH:mm:ss - DD MMM YYYY"),
        // }));

        res.status(200).json({ data: searchProduct });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
};


// filter สินค้าตาม category
exports.filterProduct = async (req, res) => {
    try {
        const { category } = req.query;
        console.log("category ->", category);

        // ถ้ากดเลือก all แปลว่าแสดงทั้งหมด
        if (category === "" || category === "all") {
            const allproduct = await Product.find().populate('category', 'name').lean();

            if (!allproduct || allproduct.length === 0) {
                return res.status(404).json({ status: "error", message: "ไม่พบข้อมูลสินค้า" });
            }

            // // แปลงเวลา
            // const modifiedProducts = allproduct.map((product) => ({
            //     ...product,
            //     last_updated: moment(product.last_updated)
            //         .tz("Asia/Bangkok")
            //         .format("HH:mm:ss - DD MMM YYYY"),
            // }));

            res.status(200).json({ data: allproduct });


        // แสดงตาม category ที่เลือก
        }else{

            // ค้นหา category
            const getcategory = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            console.log("getcategory ->", getcategory);

            // ค้นหาสินค้า
            const filterProduct = await Product.find({ category: getcategory })
                .populate('category', 'name').lean();

            if (!filterProduct || filterProduct.length === 0) {
                return res.status(404).json({ status: "error", message: "ไม่พบข้อมูลสินค้า" });
            }

            // // แปลงเวลา
            // const modifiedProducts = filterProduct.map((product) => ({
            //     ...product,
            //     last_updated: moment(product.last_updated)
            //         .tz("Asia/Bangkok")
            //         .format("HH:mm:ss - DD MMM YYYY"),
            // }));

            res.status(200).json({ data: filterProduct });
        }

        

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
};