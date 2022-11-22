const mongoose = require('mongoose');

const cart = new mongoose.Schema(
        {product: [{
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
        }]},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Cart', cart);
