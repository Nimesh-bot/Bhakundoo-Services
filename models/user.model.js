const mongoose = require('mongoose');

const user = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide your first name']
        },
        lastName: {
            type: String,
            required: [true, 'Please provide your last name']
        },
        email: {
            type: String,
            required: [true, 'Please provide your valid email'],
        },
        password: {
            type: String,
            required: [true, 'Please use a strong password'],
        },
        address: {
            type: String,
            required: [true, 'Please provide your address']
        },
        phone: {
            type: String,
            required: [true, 'Please provide your phone number']
        },
        gender: {
            type: String,
            required: [true, 'Please provide your gender.']
        },
        avatar: {
            type: String,
            default: 'https://i.pinimg.com/736x/b9/2c/55/b92c5560709fc3b68a9c82873804a3a4.jpg'
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', user);