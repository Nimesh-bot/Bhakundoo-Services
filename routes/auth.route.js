const express = require('express');
const { facebookLogin } = require('../controller/auth.controller');

const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).json({
        message: 'Auth Route'
    })
})

route.get('/facebook-login', facebookLogin);
module.exports = route;