const mongoose = require('mongoose');

const order = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
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