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
        const products = await Product.find({isFeatured: true}).populate([{path: 'gallery'}, {path: 'category'}]);
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

const addToCard = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const cart = await newCart.save();
        res.status(200).json({
            message: 'Cart added successfully',
            cart
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({
            message: 'Cart updated successfully',
            cart
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}
const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Cart deleted successfully',
            cart
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}
const getCart = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json({
            message: 'Cart fetched successfully',
            cart
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
}