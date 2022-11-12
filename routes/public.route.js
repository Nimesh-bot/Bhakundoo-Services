const express = require('express');
const { getCategories, getProducts, getFeaturedProducts, getProductBySlug } = require('../controller/public.controller');

const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the service of....'
    })
})

route.get('/products', getProducts);
route.get('/products/featured', getFeaturedProducts);
route.get('/product/:slug', getProductBySlug);
route.get('/categories', getCategories);

module.exports = route;