const express = require('express')
cart_Router=express()


const cartController= require("../controller/cartController")

const { userSessionChecke}=require("../middlewear/middlewear")


cart_Router.post('/addToCart/:id',cartController.addToCart)
cart_Router.get('/cart',cartController.userCart)
cart_Router.post('/itemInc/:id',cartController.itemInc)

cart_Router.post('/itemDec/:id',cartController.itemDec)

cart_Router.put('/itemDel/:id',cartController.itemDelete)

module.exports=cart_Router