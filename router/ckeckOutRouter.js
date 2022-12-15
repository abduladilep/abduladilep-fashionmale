const express = require('express')
const checkoutRouter = express()

const checkoutController= require('../controller/checkOutController')

const {
    userSessionChecker
} = require('../\/middlewear/middlewear')

checkoutRouter.get('/checkout/:id', userSessionChecker,checkoutController.checkoutPage)
checkoutRouter.post('/placeOrder/:id', userSessionChecker,checkoutController.placeOrder)
checkoutRouter.get('/orderSuccess',  userSessionChecker,checkoutController.orderSuccess)
checkoutRouter.post('/verifyPay', userSessionChecker, checkoutController.verifyPay)
checkoutRouter.get('/viewOrders', userSessionChecker, checkoutController.viewOrders)
checkoutRouter.post('/orderedProducts', userSessionChecker, checkoutController.orderedProducts)
checkoutRouter.put('/cancelOrder/:id', checkoutController.cancelOrder)

module.exports = checkoutRouter