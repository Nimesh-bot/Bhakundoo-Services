const mongoose = require('mongoose');

const cart = new mongoose.Schema(
        {product: [{
            product: {
                type: String,
                // ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }]},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Cart', cart);