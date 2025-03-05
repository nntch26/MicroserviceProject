// controllers/categoryController.js

const Category = require('../models/Category'); 

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json({ status: "success", data: category });

    } catch (error) {
        console.log(error.message); 
        res.status(500).json({ status: "error", message: error.message });
    }
};
