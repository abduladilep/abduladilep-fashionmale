const express=require('express')
const admin_router=express()

const adminController=require('../controller/admincontroller')

admin_router.use(express.static('public/adminpublic'))


admin_router.get('/adminLogin',adminController.admiLogin)

admin_router.post('/adminPost',adminController.adminPost)


admin_router.get('/index',adminController.index)

// admin_router.get('/Product',adminController.product)

// admin_router.post('/addCategory',adminController.addCategory)

// admin_router.get('/addProduct',adminController.addProduct)

// admin_router.post('/addProductPost',adminController.addProductPost)

admin_router.get('/userMangment',adminController.userManagment)

admin_router.put('/edituser/:id',adminController.editUser)

// admin_router.put('/userStateUnblock/:id',adminController.userStateUnblock)

admin_router.get("/productManagment",adminController.productManagment)


module.exports=admin_router