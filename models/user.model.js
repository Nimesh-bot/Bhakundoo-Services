const mongoose = require('mongoose');

const user = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your first name']
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        }
        ,
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        gender: {
            type: String,
        },

        avatar: {
            type: String,
            default: 'https://i.pinimg.com/736x/b9/2c/55/b92c5560709fc3b68a9c82873804a3a4.jpg'
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
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