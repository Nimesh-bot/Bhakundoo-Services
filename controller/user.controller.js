const Cart = require('../models/cart.model')
const User = require('../models/user.model')

const fetchUserData = async (req, res) => {
    try {
        const user = await User.findOne(req.body.email.select('-password'));
        res.status(200).json({
            message: 'User fetched successfully',
            user
        })
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

const addToCart = async (req, res) => {
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
// get cart of user
const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({user: req.user._id}).populate([{path: 'product', populate: {path: 'gallery'}}]);
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
    addToCart,
    updateCart,
    deleteCart,
    getCart,
    fetchUserData
}
