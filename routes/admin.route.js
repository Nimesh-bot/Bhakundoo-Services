const express = require('express');
const multer = require('multer');

const route = express.Router();

const { addCategory, addProduct } = require('../controller/admin.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Image');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });

route.post('/category', upload.single('image'), addCategory);
route.post('/product', upload.array('image'), addProduct);

module.exports = route;