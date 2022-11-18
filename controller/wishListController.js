const Product = require('../model/productSchema')
const CartItem = require("../model/cartScheema");
const User = require("../model/userScheema")
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const Wishlist = require('../model/wishListScheema')






const addToWishlist = async (req, res) => {

    try {
        if (req.session.useremail) {
            const prodId = req.params.id
            const ProductId = new mongoose.Types.ObjectId(prodId)
            Id = user[0]._id;
            const userId = req.session.userId
            const detail = await User.findById({ _id: userId })
            if (detail.state == false) {

                const userExist = await Wishlist.findOne({ userId })
                if (userExist) {
                    const productExist = await Wishlist.findOne({
                        $and: [{ userId }, {
                            wishlistItems: {
                                $elemMatch: {
                                    ProductId
                                }
                            }
                        }]
                    })
                    if (productExist) {
                        res.send({ success: false })
                    } else {
                        await Wishlist.updateOne({ userId }, { $push: { wishlistItems: { ProductId } } })
                        res.send({ success: true })
                    }
                } else {
                    const wishlist = new Wishlist({
                        userId, wishlistItems: [{ ProductId: ProductId }]
                    })
                    await wishlist.save()
                        .then(() => {
                            res.send({ success: true })
                        })
                        .catch((err) => {
                            // res.render('error', { err })
                        })
                }
            } else {
                req.flash('error', 'You are unable to access the product')
                res.redirect('back')
            }
        } else {
            req.flash('error', 'You are not logged in')
            res.redirect('back')
        }
    } catch (err) {
        res.render('error', { err })
    }
}

const userWishlist = async (req, res) => {

    try {
        const userId = req.session.userId
        const wishlistProducts = await Wishlist.aggregate([{ $match: { userId } }, { $unwind: '$wishlistItems' },
        { $project: { item: '$wishlistItems.ProductId' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }
        ]);


        res.render('userpage/wishlist', { wishlistProducts })
    } catch (err) {
        // res.render('error', { err })
    }
}



const deleteWishlist = async (req, res) => {


    try {
        const prodId = req.params.id
        const ProductId = new mongoose.Types.ObjectId(prodId)
        const userId = req.session.userId
        const detail = await User.findById({ _id: userId })
        if (detail.state == false) {
            await Wishlist.updateOne({ userId }, { $pull: { wishlistItems: { "ProductId": ProductId } } })
            res.send({ success: true })
        } else {
            req.flash('error', 'You are unable to access the product')
            res.send({ success: false })
        }
    } catch (err) {
        // res.render('error', { err })
    }
}

module.exports = {
    addToWishlist,
    userWishlist,
    deleteWishlist
}