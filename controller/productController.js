
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
const User = require("../model/userScheema")

// product_Router.use(express.static('public/adminpublic'))





const product = async (req, res) => {

    // const category = await Category.find({})
    const product = await Product.find({})



    res.render('adminpages/products', { product })
}



const addProduct = async (req, res) => {
    console.log("hhhhhhh");
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

const viewProductDetails = async (req, res) => {
    const email = req.session.useremail

    const user = await User.findOne({ email })
    try {
        const { id } = req.params
        const details = await Product.findById(id)
        const category = await Category.find({})
        console.log("rrrr", category);
        res.render('userpage/shop-details', { details, user, category })
    } catch (err) {
        res.render('error', { err })
    }

}

// const editProduct = async (req,res)=>{

   

//     console.log("ppppppp");

//     res.render("adminpages/editProduct")
// }

const editproduct = async (req, res) => {
   
    const { id } = req.params
   console.log(id);
    const datas = await Product.findById(id)
    const categories = await Category.find({})
    
    console.log("datasssyrfhg6",datas);
    const productId = datas._id
    const category_id = datas._id

 
    const categorylook = await Product.aggregate([
        {
            $match: {
                _id: productId,
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category",
            },
        },
    ]);
     console.log(categorylook);
    // console.log(categorylook[0].category[0]);

    const categoryFind = await Category.find({});

   
    res.render('adminpages/editproduct', { datas, categorylook,categoryFind, categories })

}

const editProduct = async (req, res) => {
    const { id } = req.params
    console.log("pooo",req.params);
    // console.log('edited')
    const edit = req.body
   const pro= await Product.findByIdAndUpdate(id, { $set: edit })

   console.log("pro");
    res.redirect('/product/product')

}


module.exports = {

    product,
    addProduct,
    addProductPost,
    deleteProduct,
    viewProductDetails,
    editproduct,
    editProduct

}

