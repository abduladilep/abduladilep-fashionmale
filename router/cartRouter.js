const express = require('express')
cart_Router = express()


const cartController = require("../controller/cartController")

const { userSessionChecker } = require("../middlewear/middlewear")


cart_Router.post('/addToCart', cartController.addToCart)

cart_Router.get('/cart', userSessionChecker ,cartController.userCart)

cart_Router.post('/itemInc', cartController.itemInc)

cart_Router.post('/itemDec', cartController.itemDec)

cart_Router.put('/itemDel', cartController.itemDelete)

module.exports = cart_Router