const Product = require('../model/productSchema')
const CartItem = require("../model/cartScheema");
const User = require("../model/userScheema")
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const Wishlist = require('../model/wishListScheema')






const addToWishlist = async (req, res) => {

    const userId = req.session.userId
    const productId = req.body.id

    try {

        const userExist = await Wishlist.findOne({ userId: userId })

       
        if (userExist) {
            const productExist = await Wishlist.findOne({
                $and: [{ userId: userId }, {
                    wishlistItems: {
                        $elemMatch: {
                            ProductId: productId
                        }
                    }
                }]
            })
            if (productExist) {
                res.send({ success: false })
            } else {
                await Wishlist.updateOne({ userId: userId }, { $push: { wishlistItems: { ProductId: productId } } })
                res.send({ success: true })
            }
        } else {
            const wishlist = new Wishlist({
                userId: userId, wishlistItems: [{ ProductId: productId }]
            })
            await wishlist.save()
                .then(() => {
                    res.send({ success: true })
                })
                .catch((err) => {
                    res.render('error', { err })
                })
        }

    } catch (err) {
        res.render('error', { err })
    }
}

const userWishlist = async (req, res) => {
    const user=req.session.userId

    try {
        const userId = req.session.userId
        const wishlistProducts = await Wishlist.aggregate([{ $match: { userId } }, { $unwind: '$wishlistItems' },
        { $project: { item: '$wishlistItems.ProductId' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }
        ]);


        res.render('userpage/productWishlist', { wishlistProducts,user })
    } catch (err) {
        res.render('error', { err })
    }
}


const deleteWishlist = async (req, res) => {
   

    try {

        const userId = req.session.userId
        const productId = req.params.id

        await Wishlist.updateOne({ userId: userId }, { $pull: { wishlistItems: { "ProductId": productId } } })
        res.send({ success: true })

    } catch (err) {
        res.render('error', { err })
    }
}

module.exports = {
    addToWishlist,
    userWishlist,
    deleteWishlist
}