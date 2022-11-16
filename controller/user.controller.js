const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { createAccessToken } = require('../middleware/auth.middleware')

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

// const fetchUserData = async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email});
//         res.status(200).json({
//             message: 'User fetched successfully',
//             user
//         });
//     }
//     catch(err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// }

const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.aud)
        const cart = await Cart.findById(user.cart)
        if(!cart){
            const newCart = new Cart(req.body.products[0]);
            const cartt = await newCart.save()

            const user_up = await user.updateOne({cart: cartt._id})
            console.log(user_up)
        }

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

const getAccessToken = async(req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken
        console.log(req.cookies);
        if(!rf_token) return res.status(400).json({msg: "Please login now!"})

        jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Please login now!"})

            const access_token = createAccessToken({id: user.id})
            res.json({access_token})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    addToCart,
    updateCart,
    deleteCart,
    getCart,
    getAccessToken
}
