const bcrypt = require("bcrypt")
const Category = require('../model/brandSchema')
const Product = require('../model/productSchema')
const Admin = require("../model/adminScheema")
const Brand = require("../model/brandSchema")
const { exists } = require("../model/userScheema")




const addBrand = async (req, res) => {
    const brand = req.body.brand
  

    const newbrand = new Brand({
        brand: brand
    })
    try {
        await newbrand.save()
       

    } catch (error) {
        req.flash = ("msg", "brand not exists")

    }
    res.redirect('/admin/productManagment')

}


const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params
        const brand = await Brand.findByIdAndDelete(id)
        res.redirect('/admin/productManagment')
    } catch (err) {
        console.log(err);
    }

}


module.exports = { addBrand, deleteBrand }
