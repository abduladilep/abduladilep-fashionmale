

const User = require('../model/userScheema')
const CheckoutData = require('../model/checkoutSchema')
const Coupon = require('../model/coupenSchema')
const addressData = require('../model/adressSchema')
const CartItem = require('../model/cartScheema')
const mongoose = require('mongoose')
const Product = require('../model/productSchema')





const catagorySort = async (req, res) => {

   const catagoryId = mongoose.Types.ObjectId(req.body.catagoryId);

   const product = await Product.find({ category_id: catagoryId })
  

   res.send({ product });

}




module.exports = {

   catagorySort,

}