const express=require('express')
const admin_router=express()

const adminController=require('../controller/admincontroller')
const couponController=require('../controller/couponController')

admin_router.use(express.static('public/adminpublic'))
const { adminSessonChecker } = require("../middlewear/middlewear")

admin_router.get('/adminLogin',adminController.admiLogin)

admin_router.post('/adminPost',adminController.adminPost)

admin_router.get('/index',adminController.index)

admin_router.get('/userMangment',adminController.userManagment)

admin_router.put('/edituser/:id',adminController.editUser)

admin_router.get("/manageProduct",adminController.manageProduct)

admin_router.post('/orderitems', adminController.orderItems)

admin_router.get("/coupon",couponController.adminCouponPage);

admin_router.post("/coupon",couponController.couponAdd);

admin_router.delete("/coupon",couponController.couponDelete);

admin_router.post('/applyCoupen/:id',couponController. applyCoupen)

admin_router.get('/orders',adminController.productOrders)

admin_router.get('/editOrders/:id', adminController.editOrder)

admin_router.post('/updateOrder/:id', adminController.updateOrder)

admin_router.get('/adminLogout', adminController.logout)

module.exports=admin_router