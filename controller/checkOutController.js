// require('dotenv').config()

const User = require('../model/userScheema')
const CheckoutData = require('../model/checkoutSchema')
const Coupon = require('../model/coupenSchema')
const addressData = require('../model/adressSchema')
const CartItem = require('../model/cartScheema')
const mongoose = require('mongoose')

const {
    generateRazorpay,
} = require('../utils/helpers')

const checkoutPage = async (req, res) => {
    try {
        if (req.session.userId) {

            


            const userId = req.session.userId

            const user = await User.findById(userId)

            const useraddres = user.userAddres



            const cartList = await CartItem.aggregate([{ $match: { user: userId } }, { $unwind: '$cartItem' },
            { $project: { item: '$cartItem.ProductId', itemQuantity: '$cartItem.quantity' } },
            { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }
            ]);





            // const items = await  CartItem.findOne({ userId: userId })
            // console.log("items", items);
            // let coupencode
            // if (items.coupenCode) {
            //     coupencode = items.coupenCode
            // }

            // let discount;
            // if (coupencode) {
            //     console.log("mxksmaks", coupencode);

            //     const coupens = await Coupon.findOne({ coupenCode: coupencode })
            //     const discountt = coupens.discountPercentage





                let total;
                let subtotal = 0;

                cartList.forEach((p) => {
                    p.product.forEach((p2) => {
                        total = (p2.product_price) * (p.itemQuantity)
                        subtotal += total
                    })

                })
                let shipping;
                if (subtotal < 15000) {
                    shipping = 150
                } else {
                    shipping = 0
                }
                // if (subtotal > 15000) {
                //     discount = subtotal * (discountt / 100)
                // } else {
                //     discount = 0
                // }
                let grandtotal
                // if (discount) {
                //     grandtotal = subtotal + shipping - discount
                // } else {
                    grandtotal = subtotal + shipping
                // }

                res.render("userpage/checkout", { cartList, grandtotal, shipping, subtotal, user, useraddres})

            } else {
                req.flash('error', 'You are not logged in')
                // res.redirect('back')
            }
        }
    
     catch (err) {
        // res.render('error',{err})
    }
}

const placeOrder = async (req, res) => {

    try {
        // const usrId = req.session.user._id
        // const userId = new mongoose.Types.ObjectId(usrId)
        const userId = req.session.userId;

        const prodId = req.body.cartId


        const cartId = new mongoose.Types.ObjectId(prodId)
        const items = await CartItem.findById({ _id: cartId })

        // const coupencode = items.coupenCode
        // let discount;
        // if(coupencode) {
        //     const coupens = await coupenData.findOne({code:coupencode})
        //     discount = coupens.discount

        // }


        const cartList = await CartItem.aggregate([{ $match: { user: userId } }, { $unwind: '$cartItem' },
        { $project: { item: '$cartItem.ProductId', itemQuantity: '$cartItem.quantity' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }]);


        let total;
        let subtotal = 0;

        cartList.forEach((p) => {
            p.product.forEach((p2) => {
                total = parseInt(p2.product_price) * parseInt(p.itemQuantity)
                subtotal += total
            })
        })

        const shipping = 150;
        const bill = subtotal + shipping
        let status = req.body.payment === 'cod' ? false : true

let onlinePaymentSuccess=req.body.payment ==='cod' ? true:false
onlinePaymentSuccess=req.body.payment ==='Online' ? false:true
 
       

        const orderData = new CheckoutData({
            userId,
            cartItems: items.cartItem,

            address: req.body.address,
            paymentStatus: req.body.payment,
            orderStatus: {
                date: Date.now()
            },

            bill,

            isCompleted: status,
            onlinePaymentSuccess

        })



       
        orderData
            .save()
            .then((orderData) => {
                if (orderData.paymentStatus == 'COD') {
                    const codSuccess = true
                    res.send({ codSuccess })

                } else {
                    const orderId = orderData._id
                    const total = orderData.bill
                    console.log("tyuio",orderData._id);
                    
                    generateRazorpay(orderId, total).then((response) => {
                        res.json({response,orderId})
                       

                    })
                }

            })
            .catch((err) => {
                //  res.render('error',{err})
            })

        await CartItem.deleteOne({ _id: cartId })
      
    } catch (err) {
        // res.render('error',{err})
    }
}

const orderSuccess = async (req, res) => {
   
    try {
        const userId = req.session.userId
        const productId = req.params


        const cartList = await CartItem.aggregate([{ $match: { ProductId: productId } }, { $unwind: '$cartItem' },
        { $project: { item: '$cartItem.ProductId', itemQuantity: '$cartItem.quantity' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }]);
        let total;
        let subtotal = 0;

        cartList.forEach((p) => {
            p.product.forEach((p2) => {
                total = parseInt(p2.price) * parseInt(p.itemQuantity)
                subtotal += total
            })
        })
        let shipping = 0;
        if (subtotal < 15000) {
            shipping = 150
        } else {
            shipping = 0
        }
        const bill = subtotal + shipping
        const orderData = await CheckoutData.find({ userId })
        res.render('userpage/orderSuccess', { cartList, bill, shipping, orderData })
    } catch (err) {
        // res.render('error',{err})
    }
}

const verifyPay = async (req, res) => {
    console.log("verifypay");
    
    verifyPay(req.body).then(() => {
        
        console.log("verifypay", req.body);
        changePaymentStatus(req.body).then(() => {
            res.json({ status: true })
        }).catch((err) => {
            res.json({ status: false, errMsg: '' })
        })
    }).catch((err) => {
        // res.render('error',{err})
    })
}

function changePaymentStatus(orderId) {
    console.log("OIOOO",orderId);
    console.log("OIOOO");

    return new Promise((resolve, reject) => {
        console.log("odrr.id",orderId.orderId);

        const Id = mongoose.Types.ObjectId(orderId.orderId)
        console.log("iiiddd",Id);
        CheckoutData.findByIdAndUpdate({ _id: Id }, {
            $set: {
                isCompleted: true,
                onlinePaymentSuccess:true
            }
        }).then(() => {
            resolve()
        }).catch((err) => {
            res.render('error', { err })
        })

    })
}

const viewOrders = async (req, res) => {

    try {
        const userId = req.session.userId
        const orderData = await CheckoutData.find({ userId,onlinePaymentSuccess:true }).sort({ 'orderStatus.date': -1 })
        console.log("orderview", orderData);
        res.render('userpage/orderDetails', { orderData })
    } catch (err) {
        res.render('error', { err })
    }
}

const orderedProducts = async (req, res) => {
    try {

        const cartId = mongoose.Types.ObjectId(req.body)
       

        const cartList = await CheckoutData.aggregate([{ $match: { _id: cartId } }, { $unwind: '$cartItems' },
        { $project: { item: '$cartItems.ProductId', itemQuantity: '$cartItems.quantity' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }])




        res.send({ cartList })
    } catch (err) {
        res.render('error', { err })
    }
}



const cancelOrder = async (req, res) => {
   

    try {
        const { id } = req.params
        await CheckoutData.findByIdAndUpdate(id, {
            orderStatus: {
                type: "Cancelled"
            },
            isCompleted: false
        })
        res.send({ status: true })
    } catch (err) {
        res.render('error', { err })
    }
}





module.exports = {
    checkoutPage,
    placeOrder,
    orderSuccess,
    verifyPay,
    viewOrders,
    orderedProducts,

    cancelOrder
}