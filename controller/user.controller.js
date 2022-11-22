const jwt = require('jsonwebtoken')

const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')
const Order = require('../models/order.model')

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
    const body = req.body[0]
    console.log(body)
    try {
        const user = await User.findById(req.user.aud)
        // const cart = await Cart.findByIdAndDelete(user.cart)
        const cart = await Cart.findByIdAndUpdate(user.cart, { "$push": { product: {product: body.product, quantity: body.quantity, size: body.size, variant: body.variant} } })
        if(!cart){
            const newCart = new Cart({ product: {product: body.product, quantity: body.quantity, size: body.size, variant: body.variant} });
            const cartt = await newCart.save()

            const user_up = await user.updateOne({cart: cartt._id})
        }
        const newcart = await Cart.findById(user.cart)

        res.status(200).json({
            message: 'Cart added successfully',
            newcart
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
        const user = await User.findById(req.user.aud)
        const cart = await Cart.findById(user.cart).populate([{path: 'product.product', populate: {path: 'gallery'}}])
        const newcart = await cart.update({"$pull": {product:{_id: req.params.id}}})

        res.status(200).json({
            message: 'Cart deleted successfully',
            newcart
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
        const user = await User.findById(req.user.aud)
        const cart = await Cart.findById(user.cart).populate([{path: 'product.product', populate: {path: 'gallery'}}])

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

const createOrder = async (req, res) => {
    const body = req.body
    try {
        const user = await User.findById(req.user.aud)
        const cart = await Cart.findById(user.cart)
        const temp = cart.product
        console.log(temp)
        const newOrder = new Order({ userId: user._id, cart: cart.product, city: body.city, street: body.street, phone: body.phone });
        const order = await newOrder.save()
        const cart_del = await Cart.findByIdAndDelete(user.cart)

        res.status(200).json({
            message: 'Order created successfully',
            // order
        });
    }
    catch(err) {
        console.log(err)
        res.status(400).json({
            message: err.message
        });
    }
}

const getOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user.aud)
        // const orders = await Order.deleteMany()
        const orders = await Order.find({userId: user.id}).populate([{path: 'cart.product', populate: {path: 'gallery'}}])

        res.status(200).json({
            message: 'Orders fetched successfully',
            orders
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
    getAccessToken,
    createOrder,
    getOrders
}
