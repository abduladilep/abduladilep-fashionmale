const Product = require('../model/productSchema')
const CartItem = require("../model/cartScheema");
const User = require("../model/userScheema")
const session = require('express-session');
const { default: mongoose } = require('mongoose');




const addToCart = async (req, res) => {
    console.log("hhh");
    try {
        if (req.session.useremail) {
            const prodId = req.params.id

            const productId = new mongoose.Types.ObjectId(prodId)

            const userId = req.session.userId
            

            const item = await Product.findOne({ _id: productId })

            const price = item.product_price

            const detail = await User.findById({ _id: userId })


            if (detail.state == false) {

                const userExist = await CartItem.findOne({ userId })

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
                    console.log("product exisst", productExist);

                    if (productExist) {

                        await CartItem.findOneAndUpdate({ $and: [{ userId }, { "cartItem.ProductId": productId }] }, { $inc: { "cartItem.$.quantity": 1 } })
                        console.log('exist');

                        res.send({ success: true })
                    } else {
                        await CartItem.updateOne({ userId }, { $push: { cartItem: { ProductId: productId, quantity: 1, price } } })

                        res.send({ success: true })
                    }
                } else {

                    const cart = new CartItem({
                        user: userId, cartItem: [{ ProductId: productId, quantity: 1, price }]
                    })
                    await cart.save()

                        .then(() => {
                            res.send({ success: true })
                        })
                        .catch((err) => {
                            res.render('error',{err})
                        })
                }
                console.log(cart);
            } else {
                req.flash('error', 'You are unable to access the product')
                res.redirect('back')
            }
        } else {
            req.flash('error', 'You are not logged in')
            res.redirect('back')
        }
    } catch (err) {
        // res.render('error',{err})
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

        // res.render('error', { err })
    }
}


const itemInc = async (req, res) => {
    try {
        const prodId = req.params
        const productId = mongoose.Types.ObjectId(prodId)
        const userId = req.session.userId
        const detail = await User.findById({ _id: userId })

        if (detail.state == false) {
            const userExist = await CartItem.findOne({ userId })
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
                    

                    await CartItem.findOneAndUpdate({ $and: [{ userId }, { "cartItem.ProductId": productId }] }, { $inc: { "cartItem.$.quantity": 1 } })
                    let quantity = 0
                    req.flash('success', 'Item added to cart successfully')
                    res.send({ success: true })
                } else {
                    req.flash('error', 'Unable to add item!!!')
                    res.redirect('back')
                }
            } else {
                req.flash('error', 'You are not logged in')
            }
        } else {
            req.flash('error', 'You are unable to access the product')
            res.redirect('back')
        }

    } catch (err) {
        // res.render('error',{err})
    }
}




const itemDec = async (req, res) => {
    try {
        const prodId = req.params.id
        const productId = new mongoose.Types.ObjectId(prodId)
        const userId = req.session.userId
        const detail = await User.findById({ _id: userId })

        if (detail.state == false) {
            const userExist = await CartItem.findOne({ userId })

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
                    await CartItem.findOneAndUpdate({ $and: [{ userId }, { "cartItem.ProductId": productId }] }, { $inc: { "cartItem.$.quantity": -1 } })
                    req.flash('success', 'Item removed from cart successfully')
                    res.send({ success: true })
                } else {
                    req.flash('error', 'Unable to delete item!!!')
                    res.redirect('back')
                }
            } else {
                req.flash('error', 'You are not logged in')
            }
        } else {
            req.flash('error', 'You are unable to access the product')
            res.redirect('back')
        }
    } catch (err) {
        // res.render('error',{err})
    }
}

const itemDelete = async (req, res) => {
    try {
        const prodId = req.params.id
        const productId = new mongoose.Types.ObjectId(prodId)
        const userId = req.session.userId
        console.log(userId);

        const detail = await User.findById({ _id: userId })


        if (detail.state == false) {
            await CartItem.updateOne({ userId }, { $pull: { cartItem: { "ProductId": productId } } })


            res.send({ success: true })
        } else {
            req.flash('error', 'You are unable to access the product')
            res.redirect('back')
        }

    } catch (err) {
        // res.render('error',{err})
    }
}






module.exports = {
    addToCart,
    itemInc,
    itemDec,
    itemDelete,
    userCart,
}