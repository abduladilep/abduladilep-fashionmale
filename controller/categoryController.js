const bcrypt = require("bcrypt")
const Category = require('../model/categorySchema')
const subCategory = require('../model/subCategoryScheema')
const Product = require('../model/productSchema')
const Admin = require("../model/adminScheema")



const addCategory = async (req, res) => {
    const category = req.body.category
   
    const newCategory = new Category({
        category: category
    })
    try {
        await newCategory.save()
    

    } catch (error) {
        req.flash("msg", "category already exist")
    }
    res.redirect("/admin//manageProduct")
}



const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)

        res.redirect('/admin/manageProduct')
    } catch (err) {
        console.log(err);
    }

}


const addsubCategory = async (req, res) => {

    const subcategory = req.body.subcategory
    const category = req.body.category

  


    const newsubCategory = new subCategory({

        subcategory: subcategory,
        Categoryes: category
    })
    try {
        await newsubCategory.save()
      
    } catch (error) {



        req.flash("msg", 'subcategory already exist')
    }
    res.redirect('/admin/manageProduct')

}



const deletesubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const subcategory = await subCategory.findByIdAndDelete(id)
        res.redirect('/admin/manageProduct')
    } catch (err) {
        console.log(err);
    }

}




module.exports = { addCategory, deleteCategory, addsubCategory, deletesubCategory }
