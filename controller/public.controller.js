const Cart = require('../models/cart.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate([{path: 'gallery'}]);
        // console.log(products);
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
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({isFeatured: true}).populate([{path: 'gallery'}]).populate([{path: 'category'}]);
        res.status(200).json({
            message: 'Featured products fetched successfully',
            products
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}
const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({slug: req.params.slug}).populate([{path: 'gallery'}, {path: 'category'}]);
        res.status(200).json({
            message: 'Product fetched successfully',
            product
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

const getProductsByCategories = async (req, res) => {
    // get category slug through params and find product with id of that category
    try {
        const category = await Category.findOne({slug: req.params.slug});
        console.log(category);
        const products = await Product.find({category: category._id}).populate([{path: 'gallery'}]);
        res.status(200).json({
            message: 'Products fetched successfully',
            category,
            products
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
    getFeaturedProducts,
    getProductBySlug,
    getProductsByCategories,
}