
const bcrypt= require("bcrypt")
const User =require('../model/userScheema')
const nodemailer = require("nodemailer")
const otpGenerator=require('otp-generator');
const { request } = require("express");
const { find } = require("../model/productSchema");
const product =require('../model/productSchema')
const Category=require("../model/categorySchema")
const subCategory = require("../model/subCategoryScheema");


let msg = "";


let transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    service:"Gmail",

    auth :{
        // user:process.env.email,
        // Pass:process.env.password
        user:`adilep7165@gmail.com`,
        pass:`clmdzuatjaueqdcg`



    },
})

const otp =`${Math.floor(1000+Math.random()*9000)}`;


const  homepage=(req,res)=>{
    const user=req.session.useremail
    console.log(req.session);
    res.render('userpage/index',{user})
}

const shop=async(req,res)=>{
    console.log(req.session.useremail);
    const newProduct=await product.find()
    const newCategory=await Category.find()
    const newsubCategory=await subCategory.find()
    res.render('userpage/shop',{newProduct,newCategory,newsubCategory})
}

const about=(req,res)=>{
    res.render('userpage/about')
}
const shopdetails=(req,res)=>{
    res.render('userpage/shop-details')
}
// const cart=(req,res)=>{
//     res.render('userpage/shopping-cart')
// }
const checkout=(req,res)=>{
    res.render('userpage/checkout')
}

const contact=(req,res)=>{
    res.render('userpage/contact')
}

const blog=(req,res)=>{
    res.render('userpage/blog')
}

const signin=(req,res)=>{
    res.render('userpage/signin')
}

const userLogin=(req,res)=>{
    res.render('userpage/userLogin')
}

const signinPost=async(req,res)=>{
    console.log(req.body)

const {
    Firstname,
    Lastname,
     Email,
     Password, 
     type,
     state
}=req.body;
// console.log(Email);

const  hash =await bcrypt.hash(Password,12)
const user = new User({
    Firstname,
    Lastname,
    Email,
    Password:hash,
    type,
    state:false,
})

req.session.useremail = req.body.Email

console.log("session:",req.session.useremail);

const mailOptions ={
    from: "adilep7165@gmail.com",
    to:req.body.Email,
    subject:"otp for registration is:",
    html:`<h3>Enter OTP to varify your email address complete signup process</h3><h1>${otp}</h1>`
};

transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        return console.log(error);
    }
    console.log("Pmessage send:%s",info.messageId)

    console.log("preview send:%s",nodemailer.getTestMessageUrl(info));

    res.render('userpage/OTP')
    
})
console.log(otp)

try{
    await user.save()
}catch(error){
    res.redirect('/signin')
    console.log(error)
}


}
const verify=async(req,res)=>{
    email=req.session.useremail;
    if(otp==req.body.otp){
        await User.updateOne({email:email},{state:true})

        res.redirect('/userLogin')


    }else{
        res.render("userpage/OTP")
    }
    
}
const loginpost=async(req,res)=>{
    const{Email,Password}=req.body
    
    const user =await User.findOne({Email})


    const validPassword =await bcrypt.compare(Password,user.Password)
    
    if(validPassword){
        req.session.useremail=user.Email;
        req.session.userId =user._id
        
            // if(user.state){

                res.redirect("/")
            }
           else{
            console.log("bocked");
            res.redirect('/userLogin')
           }
        }
        
     
    
    


const Logout= (req,res)=>{
console.log(req.session.useremail);
    try{
        req.session.destroy()
        res.redirect("/")
    }catch(error){
        console.log(error.message)
    }
}




module.exports={
    homepage,
    shop,
    about,
    shopdetails,
    checkout,
    contact,
    blog,
    signin,
    userLogin,
    signinPost,
    verify,
    loginpost,
    Logout,
}