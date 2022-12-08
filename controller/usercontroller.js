
const bcrypt = require("bcrypt")
const User = require('../model/userScheema')
const nodemailer = require("nodemailer")
const otpGenerator = require('otp-generator');
const { request } = require("express");
const { find } = require("../model/productSchema");
const product = require('../model/productSchema')
const Category = require("../model/categorySchema")
const subCategory = require("../model/subCategoryScheema");
const addressData = require("../model/adressSchema")
const CartItems = require("../model/cartScheema")
const CheckoutData = require('../model/checkoutSchema')
const Wishlist = require('../model/wishListScheema')
const bannerData = require("../model/bannerSchema")
const newBrand = require("../model/brandSchema")


const session = require("express-session");
const Brand = require("../model/brandSchema");



let msg = "";


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",

    auth: {
        // user:process.env.email,
        // Pass:process.env.password
        user: `adilep7165@gmail.com`,
        pass: `clmdzuatjaueqdcg`



    },
})

const otp = `${Math.floor(1000 + Math.random() * 9000)}`;



const homepage = async (req, res) => {
    const userId = req.session.userId
    const user = await User.find({ userId })
    console.log("asdasf", user);

    try {
        let cartCount;
        let wishlistCount
        let cartItems;
        let wishlistItems
        let orderData
        if (req.session.userId) {

            orderData = await CheckoutData.find({ userId: userId })

            cartItems = await CartItems.findOne({ user: userId })

            wishlistItems = await Wishlist.findOne({ userId })

            cartCount = await CartItems.aggregate([{ $match: { user: userId } }, { $project: { count: { $size: "$cartItem" } } }, { $project: { _id: 0 } }]);

            wishlistCount = await Wishlist.aggregate([{ $match: { userId: userId } }, { $project: { count: { $size: "$wishlistItems" } } }, { $project: { _id: 0 } }]);
        }
        const products = await product.find({ deleted: false }).limit(4)

        const newProduct = await product.find({})

        console.log("ppp", products);
        const categories = await Category.find({})

        const banner = await bannerData.find({}).sort({ date: -1 })

        const justArrived = await product.find({
            $and: [{
                expiresAt: { $gte: Date.now() }
            }, { deleted: false }]
        }).limit(4)

        res.render('userpage/index', { banner, userId, newProduct })


    } catch (err) {
        res.render('error', { err })
    }
}


// const homepage = (req, res) => {
//     const user = req.session.useremail
//     console.log(req.session);
//     res.render('userpage/index', { user })
// }

const shop = async (req, res) => {
    console.log(req.session.useremail);
    const newProduct = await product.find()
    const newCategory = await Category.find()
    const newsubCategory = await subCategory.find()
    const newBrand = await Brand.find()

    res.render('userpage/shop', { newProduct, newCategory, newsubCategory, newBrand })
}




const about = (req, res) => {
    res.render('userpage/about')
}



const contact = async (req, res) => {
    // const user=await User.find({})
    const email = req.session.email
    const user = await User.findOne({ email })
    console.log("myaccount", user);
    // const userId = users[0]._id
    // const user = await User.findById(userId)
    const useraddress = user.userAddres
    console.log("myacuntadrss", useraddress);

    res.render('userpage/contact', { user, useraddress })
}

const blog = (req, res) => {
    res.render('userpage/blog')
}

const signin = (req, res) => {
    res.render('userpage/signin')
}

const userLogin = (req, res) => {
    res.render('userpage/userLogin')
}

const signinPost = async (req, res) => {
    console.log(req.body)

    const {
        Firstname,
        Lastname,
        Email,
        Password,
        type,
        state
    } = req.body;
 

    const hash = await bcrypt.hash(Password, 12)
    const user = new User({
        Firstname,
        Lastname,
        Email,
        Password: hash,
        type,
        state: false,
    })

    req.session.useremail = req.body.Email

    console.log("session:", req.session.useremail);

    const mailOptions = {
        from: "adilep7165@gmail.com",
        to: req.body.Email,
        subject: "otp for registration is:",
        html: `<h3>Enter OTP to varify your email address complete signup process</h3><h1>${otp}</h1>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Pmessage send:%s", info.messageId)

        console.log("preview send:%s", nodemailer.getTestMessageUrl(info));

        res.render('userpage/OTP')

    })
    console.log(otp)

    try {
        await user.save()
    } catch (error) {
        res.redirect('/signin')
        console.log(error)
    }


}
const verify = async (req, res) => {
    email = req.session.useremail;
    if (otp == req.body.otp) {
        await User.updateOne({ email: email }, { state: true })

        res.redirect('/userLogin')


    } else {
        res.render("userpage/OTP")
    }

}
const loginpost = async (req, res) => {
    const { Email, Password } = req.body

    const user = await User.findOne({ Email })


    const validPassword = await bcrypt.compare(Password, user.Password)

    if (validPassword) {
        req.session.useremail = user.Email;
        req.session.userId = user._id
        console.log(req.session.userId)

        if (user.state) {

            res.redirect("/")
        }
    }
    else {
        console.log("bocked");
        res.redirect('/userLogin')
    }
}






const Logout = (req, res) => {
    console.log(req.session.useremail);
    try {
        req.session.destroy()
        res.redirect("/")
    } catch (error) {
        console.log(error.message)
    }
}




const addAddress = async (req, res) => {
    try {
        const userId = req.session.userId
        const user = await User.findOne({ userId })
        res.render('userpage/address', { user })
    } catch (err) {
        // res.render('error',{err})
    }
}


const saveAddress = async (req, res) => {

    try {
        const userId = req.session.userId

        if (!req.body) {
            // req.flash('error', 'Empty fields are not allowed')
            res.redirect('back')
            console.log("fghjk");
        }
        else {

            const { Firstname, Lastname, street, houseNo, district, pincode, state, Email, mobile } = req.body;

            try {

                await User.findByIdAndUpdate(userId, { $push: { userAddres: { Firstname, Lastname, street, houseNo, district, pincode, state, Email, mobile } } });

                res.redirect("/checkout/checkout/:id")

            } catch (err) {
                console.log('err', err);
                console.log("update faild");
            }
        }
    } catch (err) {
        // res.render('error',{err})
    }
}


const myaccount = async (req, res) => {
    // const user=await User.find({})
    const userId = req.session.userId
    const email = req.session.email
    const user = await User.findOne({ email })

    // const userId = users[0]._id
    // const user = await User.findById(userId)
    const useraddress = user.userAddres
    const orderData = await CheckoutData.find({ userId })
    console.log("oorrr", orderData);

    res.render("userpage/myaccount", { user, useraddress, orderData })
}



const deleteAddress = async (req, res) => {
    try {

        const _id = req.session.userId

        const { id } = req.params
        console.log("iiid", id);
        // const deletion = await User.findByIdAndUpdate({_id,"userAddres":id},{$unset:{"userAddres":id}})
        console.log("jjjjjj", deletion)
        // deletion.remove()
        res.send({ success: true })
    } catch (err) {
        // res.render('error',{err})
    }
}

module.exports = {
    homepage,
    shop,
    about,
    contact,
    blog,
    signin,
    userLogin,
    signinPost,
    verify,
    loginpost,
    Logout,
    addAddress,
    saveAddress,
    myaccount,
    deleteAddress,

}