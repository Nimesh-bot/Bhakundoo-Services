const express = require('express');
const { addToCart, updateCart, deleteCart, fetchUserData } = require('../controller/user.controller');
const { auth_user } = require('../middleware/auth.middleware');

const route = express.Router();

route.post('/', fetchUserData);
route.get('/addcart', auth_user, addToCart);
route.get('/update/:id', auth_user, updateCart);
route.get('/delete/:id', auth_user, deleteCart);

module.exports = route;