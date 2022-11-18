
const bcrypt = require("bcrypt")

const Product = require('../model/productSchema')
const Category = require('../model/categorySchema')
const Admin = require('../model/adminScheema')
const subCategory = require("../model/subCategoryScheema")
const { aggregate } = require("../model/productSchema")
const multer = require('multer')
const { storage } = require("../cloudinary/cloud");
const upload = multer({ storage });
const { cloudinary } = require('../cloudinary/cloud')

// product_Router.use(express.static('public/adminpublic'))





const product = async (req, res) => {

    // const category = await Category.find({})
    const product = await Product.find({})



    res.render('adminpages/products', { product })
}



const addProduct = async (req, res) => {
    const category = await Category.find({})
    const subcategory = await subCategory.find({})
    res.render("adminpages/addProduct", { category, subcategory })
}




const addProductPost = async (req, res) => {

    const { product, description, categoryId, subcategoryId, price, stock } = req.body
    console.log(req.body.subcategoryId);
    const newProduct = new Product({
        product_name: product,
        product_description: description,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        product_price: price,
        stock: stock


    })
    newProduct.image = req.files.map((f) => ({ url: f.path, filename: f.filename }))

    try {
        await newProduct.save()
        console.log(newProduct);

    } catch (error) {

        req.flash("msg", "product already exist")
    }
    res.redirect("/product/product")

}



const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        res.redirect('/product/product')
    } catch (err) {
        console.log(err);
    }

}






module.exports = {

    product,
    addProduct,
    addProductPost,
    deleteProduct
}

