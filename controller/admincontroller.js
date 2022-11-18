
const bcrypt = require("bcrypt")
const { findOne } = require("../model/adminScheema")
const Admin = require('../model/adminScheema')
const User = require('../model/userScheema')
const Category = require('../model/categorySchema')
const Product = require('../model/productSchema')

const mongoose = require('mongoose')
const Brand = require("../model/brandSchema")
const subCategory = require("../model/subCategoryScheema")






const admiLogin = (req, res) => {

    res.render('adminpages/login')
}






const adminPost = async (req, res) => {
    console.log("fgfgdgdg");

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

const index = (req, res) => {
    res.render('adminpages/index')
}



const userManagment = async (req, res) => {

    const showUser = await User.find({}).sort({ name: 1 })

    res.render('adminpages/userManagment', { showUser ,msg:req.flash("invalid")})
}


const editUser = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);

        const userid = new mongoose.Types.ObjectId(id)

        console.log(userid);

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

const productManagment = async (req, res) => {
    const brand = await Brand.find({})
    const category = await Category.find({})
    const subcategory= await subCategory.find({})

    res.render('adminPages/Brand', { brand,category,subcategory})
}



module.exports = {
    admiLogin,
    adminPost,
    index,
    userManagment,
    editUser,
    // product,
    // addCategory,
    // addProduct,
    // addProductPost
    productManagment,
}