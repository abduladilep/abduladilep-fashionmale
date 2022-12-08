const Product = require('../model/productSchema')
const CartItem = require("../model/cartScheema");
const User = require("../model/userScheema")
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const { product } = require('./productController');




const addToCart = async (req, res) => {
   
    const userId = req.session.userId
    const productId = req.body.id

  

    try {

        if (req.session.userId) {

            const userExist = await CartItem.findOne({ user: userId })
            

            if (userExist) {
                const productExist = await CartItem.findOne({
                    $and: [{ user: userId }, {
                        cartItem: {
                            $elemMatch: {
                                ProductId: productId
                            }
                        }
                    }]
                })
                if (productExist) {

                    await CartItem.findOneAndUpdate({
                        $and: [{ user: userId }, {
                            cartItem: {
                                $elemMatch: {
                                    ProductId: productId
                                }
                            }
                        }]
                    }, { $inc: { "cartItem.$.quantity": 1 } })


                   
                }
                else {
                    await CartItem.updateOne({ user: userId }, { $push: { cartItem: { ProductId: productId, quantity: 1 } } })

                   
                }

            } else {
              
                const cart = new CartItem({
                    user: userId, cartItem: [{ ProductId: productId, quantity: 1 }]
                })

                await cart.save()


            }

        }
    } catch (err) {
        res.render('error', { err })
    }
}

const userCart = async (req, res) => {


    try {

        const userId = req.session.userId


        const cartList = await CartItem.aggregate([{ $match: { user: userId } }, { $unwind: '$cartItem' },
        { $project: { item: '$cartItem.ProductId', itemQuantity: '$cartItem.quantity' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }
        ]);


        let total;
        let subtotal = 0;

        cartList.forEach((p) => {
            p.product.forEach((p2) => {
                total = (p2.product_price) * (p.itemQuantity)
                subtotal += total
            })
        })


        let shipping = 0;
        if (subtotal < 15000) {

            shipping = 150
        } else {
            shipping = 0

        }
        const grandtotal = subtotal + shipping
        
       
        res.render('userpage/shopping-cart', { cartList, subtotal, total, shipping, grandtotal })


    } catch (err) {

        res.render('error', { err })
    }
}


const itemInc = async (req, res) => {

    const userId = req.session.userId
    const productId = req.body.id
    console.log(userId);
    try {


        const userExist = await CartItem.findOne({ user: userId })
      


        if (userExist) {
            const productExist = await CartItem.findOne({
                $and: [{ user: userId }, {
                    cartItem: {
                        $elemMatch: {
                            ProductId: productId
                        }
                    }
                }]
            })
            if (productExist) {

                await CartItem.findOneAndUpdate({ $and: [{ user: userId }, { cartItem: { $elemMatch: { ProductId: productId } } }] }, { $inc: { "cartItem.$.quantity": 1 } })


            }

            req.flash('success', 'Item added to cart successfully')
            res.send({ success: true })

        }

    } catch (err) {
        // res.render('error',{err})
    }
}

const itemDec = async (req, res) => {
    const userId = req.session.userId
    const productId = req.body.id
    console.log(userId);
    try {


        const userExist = await CartItem.findOne({ user: userId })

        if (userExist) {
            const productExist = await CartItem.findOne({
                $and: [{ userId }, {
                    cartItem: {
                        $elemMatch: {
                            ProductId: productId
                        }
                    }
                }]
            })


            if (productExist) {
                await CartItem.findOneAndUpdate({ $and: [{ user: userId }, { "cartItem.ProductId": productId }] }, { $inc: { "cartItem.$.quantity": -1 } })
                req.flash('success', 'Item removed from cart successfully')
                res.send({ success: true })
            } else {
                req.flash('error', 'Unable to delete item!!!')
                res.redirect('back')
            }
        } else {
            req.flash('error', 'You are not logged in')
        }

    } catch (err) {
        res.render('error',{err})
    }
}

const itemDelete = async (req, res) => {
    try {

        const userId = req.session.userId
        const productId = req.body.id



        await CartItem.updateOne({ user: userId }, { $pull: { cartItem: { "ProductId": productId } } })


        res.send({ success: true })


    } catch (err) {
        res.render('error',{err})
    }
}







module.exports = {
    addToCart,
    itemInc,
    itemDec,
    itemDelete,
    userCart,
}