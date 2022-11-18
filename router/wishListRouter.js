const express = require('express')

wishList_Router=express()





const wishListController= require('../controller/wishListController')

// const {
//     sessionCheckHomePage
// } = require('../middleware/auth')

wishList_Router.post('/addToWishlist/:id',wishListController.addToWishlist)
wishList_Router.get('/wishlist', wishListController.userWishlist)
wishList_Router.delete('/deleteWishlistItem/:id', wishListController.deleteWishlist)



module.exports = wishList_Router