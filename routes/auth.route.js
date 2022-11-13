const express = require('express');
const { googleLogin } = require('../controller/auth.controller');

const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).json({
        message: 'Auth Route'
    })
})

route.post('/google-login', googleLogin);
module.exports = route;