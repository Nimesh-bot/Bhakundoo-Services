const express = require('express');
const { addToCart, updateCart, deleteCart, getAccessToken } = require('../controller/user.controller');
const { auth_user } = require('../middleware/auth.middleware');

const route = express.Router();

route.post('/refreshToken', getAccessToken);
route.post('/addcart', auth_user, addToCart);
route.post('/update/:id', auth_user, updateCart);
route.post('/delete/:id', auth_user, deleteCart);

module.exports = route;