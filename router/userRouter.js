const express = require('express')

const user_router = express()

const userController = require('../controller/usercontroller')

// const {userSessionChecker}=require('../middlewear/middlewear')

user_router.use(express.static('public'))

user_router.get('/',userController.homepage)
user_router.get('/shop', userController.shop)
user_router.get('/about', userController.about)
user_router.get('/shop-details', userController.shopdetails)
// user_router.get('/shopping-cart', userController.cart)
user_router.get('/checkout', userController.checkout)
user_router.get('/contact', userController.contact)
user_router.get('/blog', userController.blog)
user_router.get('/signin', userController.signin)
user_router.post('/signinPost', userController.signinPost)
user_router.get('/userLogin',userController.userLogin)
user_router.post('/verify', userController.verify)
user_router.post('/loginpost', userController.loginpost)
user_router.get("/Logout",userController.Logout)




module.exports = user_router