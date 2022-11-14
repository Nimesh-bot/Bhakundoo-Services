const express = require('express');
const { addToCart, updateCart, deleteCart } = require('../controller/user.controller');
const { auth_user } = require('../middleware/auth.middleware');

const route = express.Router();

route.get('/', auth_user, addToCart);
route.get('/update/:id', auth_user, updateCart);
route.get('/delete/:id', auth_user, deleteCart);

module.exports = route;