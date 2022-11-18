
const express = require('express')

brand_Router=express()

const { consumers } = require('nodemailer/lib/xoauth2')

const brandController = require('../controller/brandController')

brand_Router.use(express.static('public/adminpublic'))



brand_Router.post("/addBrand",brandController.addBrand)

brand_Router.put('/deleteBrand/:id',brandController.deleteBrand)





module.exports=brand_Router