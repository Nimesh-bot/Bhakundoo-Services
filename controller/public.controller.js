const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: 'Products fetched successfully',
            products
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

const getCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json({
            message: 'Category fetched successfully',
            category
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

module.exports = {
    getProducts,
    getCategories,
}