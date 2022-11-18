
const express = require('express')
product_Router=express()
const { consumers } = require('nodemailer/lib/xoauth2')
const productController = require('../controller/productController')
const{cloudinary}=require('../cloudinary/cloud')
const multer = require("multer");
const { storage } = require("../cloudinary/cloud");
const upload = multer({ storage });

product_Router.use(express.static('public/adminpublic'))



product_Router.get('/Product', productController.product)

product_Router.get('/addProduct',productController.addProduct)


product_Router
.route('/addProductPost')
.post(upload.array("image"),productController.addProductPost)

product_Router.put('/deleteProduct/:id', productController.deleteProduct)






module.exports =product_Router
