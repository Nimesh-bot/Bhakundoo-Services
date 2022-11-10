const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name']
    },
    image: {
        type: String,
        required: [true, 'Please provide a category image']
    },
    imageId: {
        type: String,
    }
})

module.exports = mongoose.model('Category', category);