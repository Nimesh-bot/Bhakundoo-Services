const cloudinary = require('cloudinary')
const { unlink } = require('fs')

const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Gallery = require("../models/gallery.model");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const addCategory = async (req, res) => {
    const categories = req.body;
    try {
        if(req.file) {
            const tempPath = req.file.path;
            await cloudinary.v2.uploader.upload(
                tempPath,
                async function(error, result){
                    categories["image"] = result.url;
                    categories["imageId"] = result.public_id;
                    unlink(tempPath, (err) => {
                        if (err) console.log(err);
                    });
                }
            )
        }
        const newCategory = new Category(categories);
        await newCategory.save();
        res.status(200).json({
            message: 'Category created successfully',
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

const addProduct = async (req, res) => {
    const product = req.body;
    const arr = []
    const gal = {}

    try {
        if(req.files) {
            console.log(req.files)

            for(var i=0; i<req.files.length; i++) {
                const tempPath = req.files[i].path;
                await cloudinary.v2.uploader.upload(
                    tempPath,
                    async function(error, result){
                        gal["image"] = result.url;
                        gal["imageId"] = result.public_id;
                        unlink(tempPath, (err) => {
                            if (err) throw err;
                        });
                    }
                )
                const new_gal = new Gallery(gal);
                const gall = await new_gal.save();
                arr.push(gall._id);
            }
        }
        product["gallery"] = arr;

        product["slug"] = product.name.toLowerCase().split(' ').join('-') + '-' + Math.random().toString(36).substr(2, 9);
        
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(200).json({
            message: 'Product created successfully',
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

module.exports = {
    addCategory,
    addProduct
}