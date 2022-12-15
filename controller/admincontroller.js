
const bcrypt = require("bcrypt")
const { findOne } = require("../model/adminScheema")
const Admin = require('../model/adminScheema')
const User = require('../model/userScheema')
const Category = require('../model/categorySchema')
const Product = require('../model/productSchema')
const CheckoutData = require('../model/checkoutSchema')
const mongoose = require('mongoose')
const Brand = require("../model/brandSchema")
const subCategory = require("../model/subCategoryScheema")


const admiLogin = (req, res) => {
    if(req.session.Email){
        res.redirect("/admin/index")
    }else{

    res.render('adminpages/login')
    }
}

const adminPost = async (req, res) => {


    const { Email, password } = req.body
    const admin = await Admin.findOne({ Email })

    console.log(req.body);
    if (admin) {
        const validPassword = await bcrypt.compare(password, admin.Password)

        if (validPassword) {

            req.session.Email = admin.Email

            res.redirect("/admin/index")
        }

        else {
            req.flash("invalid", "invalid username")
            res.redirect("/admin/adminLogin")
        }
    } else {
        req.flash("invalid", "invalid username")
        res.redirect("/admin/adminLogin")
    }

}


const index = async (req, res) => {
    try {
        if(req.session.Email){
            console.log("sgghsa",req.session.Email);

        const dailySale = await CheckoutData.find({ $and: [{ createdAt: { $lt: Date.now(), $gt: Date.now() - 86400000 } }, { 'orderStatus.type': { $ne: 'Cancelled' } }] })
        let todaySale = 0
        dailySale.forEach((s) => {
            todaySale += s.bill
        })
        let totalSale = 0


        const sale = await CheckoutData.find({ 'orderStatus.type': { $ne: 'Cancelled' } })
        sale.forEach((s) => {
            totalSale += s.bill
        })
        todayRevenue = todaySale * 10 / 100
        totalRevenue = totalSale * 10 / 100
        const completed = await CheckoutData.find({ isCompleted: true }).sort({ createdAt: -1 }).limit(10)
        const graph = await CheckoutData.aggregate(
            [
                {
                    $group: {
                        _id: { month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" }, year: { $year: "$createdAt" } },
                        totalPrice: { $sum: '$bill' },
                        count: { $sum: 1 }

                    }

                }, { $sort: { _id: -1 } },
                { $project: { totalPrice: 1, _id: 0 } }, { $limit: 7 }
            ]
        );

        let values = [];
        let revenue = []
        graph.forEach((g) => {
            values.push(g.totalPrice)
            revenue.push(g.totalPrice * 10 / 100)
        })

        const ordered = await CheckoutData.find({ 'orderStatus.type': 'Ordered' }).count()
        const packed = await CheckoutData.find({ 'orderStatus.type': 'Packed' }).count()
        const shipped = await CheckoutData.find({ 'orderStatus.type': 'Shipped' }).count()
        const delivered = await CheckoutData.find({ 'orderStatus.type': 'Delivered' }).count()
        const cancelled = await CheckoutData.find({ 'orderStatus.type': 'Cancelled' }).count()

    
        res.render('adminpages/index', { todaySale, totalSale, todaySale, totalRevenue, completed, values, revenue, ordered, packed, shipped, delivered, cancelled })
        
    } else{
        res.redirect('/admin/adminLogin')
    }
  } catch (err) {
        res.render('error')
    }
}



const productOrders = async (req, res) => {
 
    try {
       
        const orderData = await CheckoutData.find({onlinePaymentSuccess:true}).sort({ 'orderStatus.date': -1 })
        console.log(orderData);
        // orderId = mongoose.Types.ObjectId(orderData._Id)
        // console.log(orderId);
        res.render('adminpages/orderManagment', { orderData })
    } catch (err) {
        res.render('error', { err })
    }

    
}


const orderItems = async (req, res) => {
    try {
        const carId = req.body
        const cartId = mongoose.Types.ObjectId(carId)
        const cartList = await CheckoutData.aggregate([{ $match: { _id: cartId } }, { $unwind: '$cartItems' },
        { $project: { item: '$cartItems.ProductId', itemQuantity: '$cartItems.quantity' } },
        { $lookup: { from: 'products', localField: 'item', foreignField: '_id', as: 'product' } }]);


        res.send({ cartList })
    } catch (err) {
        res.render('error', { err })
    }
}

const userManagment = async (req, res) => {
    if(req.session.Email){

    const showUser = await User.find({}).sort({ name: 1 })
    res.render('adminpages/userManagment', { showUser, msg: req.flash("invalid") })
    }else{
        res.redirect("/admin/adminLogin")
    }

}

const editUser = async (req, res) => {
    try {
        const id = req.params.id

        const userid = new mongoose.Types.ObjectId(id)

        const user = await User.findById(userid)
        console.log(user);
        if (user.state == false) {
            await User.findByIdAndUpdate(id, { state: true })
            res.redirect('/admin/userMangment')
        } else {
            await User.findByIdAndUpdate(id, { state: false })
            res.redirect('/admin/userMangment')
        }
    } catch (err) {
        console.log(err)
    }
}

const manageProduct = async (req, res) => {
    if(req.session.Email){
    const brand = await Brand.find({})
    const category = await Category.find({})
    const subcategory = await subCategory.find({})
    res.render('adminpages/ManageProduct', { brand, category, subcategory })
    }else{
        res.redirect("/admin/adminLogin")
    }

}

const editOrder = async (req, res) => {
    try {
        const { id } = req.params
   console.log("idd",id);
        const orderData = await CheckoutData.findById(id)
        console.log(orderData);
       const orderaddrs  =orderData.address
      console.log(orderaddrs);
        
        
        
        const email = req.session.useremail
        console.log(email);
        const user = await User.findOne({Email:email })
        // useraddress=user.userAddres
        // console.log(useraddress);

        res.render('adminpages/editOrder', { orderData})
    } catch (err) {
        // res.render('error', { err })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        await CheckoutData.findByIdAndUpdate(id, {

            orderStatus: {
                type: req.body.orderStatus,
                date: req.body.date

            }
        })
        const orderData = await CheckoutData.findById(id)
        if (orderData.orderStatus[0].type == 'Delivered' && orderData.paymentStatus == 'cod') {
            await CheckoutData.findByIdAndUpdate(id, {
                isCompleted: true
            })
        } else {
            await CheckoutData.findOneAndUpdate({ $and: [{ _id: id }, { paymentStatus: 'cod' }] }, {
                isCompleted: false
            })
        }
        req.flash('success', 'Order updated Successfully')
        res.redirect('/admin/orders')
    } catch (err) {
        res.render('error', { err })
    }
}

const logout = (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/admin/adminLogin");
    } catch (error) {
        console.log(error.message)
    }
    
}


module.exports = {
    admiLogin,
    adminPost,
    index,
    userManagment,
    editUser,
    productOrders,
    orderItems,
    editOrder,
    updateOrder,
    manageProduct,
    logout

}