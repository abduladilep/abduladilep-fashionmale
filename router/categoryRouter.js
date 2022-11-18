
const express = require('express')

category_Router = express()

const { consumers } = require('nodemailer/lib/xoauth2')

const categoryController = require('../controller/categoryController')

category_Router.use(express.static('public/adminpublic'))





category_Router.post('/addCategory', categoryController.addCategory)

category_Router.put('/deleteCategory/:id', categoryController.deleteCategory)

category_Router.put('/deletesubCategory/:id', categoryController.deletesubCategory)

category_Router.post('/addsubCategory', categoryController.addsubCategory)






module.exports = category_Router