const express = require('express');
const { addToCart, updateCart, deleteCart, getAccessToken, getCart, createOrder, getOrders } = require('../controller/user.controller');
const { auth_user } = require('../middleware/auth.middleware');

const route = express.Router();

route.post('/refreshToken', getAccessToken);
route.post('/addcart', auth_user, addToCart);
route.post('/update/:id', auth_user, updateCart);
route.delete('/delete/:id', auth_user, deleteCart);
route.get('/getcart', auth_user, getCart);

route.post('/order', auth_user, createOrder);
route.get('/order', auth_user, getOrders);

module.exports = route;