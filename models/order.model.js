const mongoose = require('mongoose');

const order = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cart: [{
        product: {
            // type: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            // index: {unique: true}
        },
        quantity: {
            type: Number,
            default: 1,
        },
        size: {
            type: String,
            default: "L",
        },
        variant: {
            type: String,
            default: "Home",
        },
    }],
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
})

module.exports = mongoose.model('Order', order);