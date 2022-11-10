const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name']
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price']
    },
    gallery: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'gallery'
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Please provide a category']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide a product quantity in stock']
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    sizes: {
        type: Array,
        required: [true, 'Please provide a product sizes']
    },
    variations: {
        type: Array,
        required: [true, 'Please provide a product variations'],
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', product);