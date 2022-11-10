const express = require('express');
const { getCategories, getProducts } = require('../controller/public.controller');

const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the service of....'
    })
})

route.get('/products', getProducts);
route.get('/categories', getCategories);

module.exports = route;