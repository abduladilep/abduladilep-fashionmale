const Coupon = require("../model/coupenSchema");
const User = require('../model/userScheema')
const CheckoutData = require('../model/checkoutSchema')
const addressData = require('../model/adressSchema')
const CartItem = require('../model/cartScheema')
const mongoose = require('mongoose')
const dateFormat = require("../utils/stringtoDate");

const adminCouponPage = async (req, res) => {



    const coupons = await Coupon.find();


    res.render("adminpages/adminCoupon", { message: req.flash('message'), coupons });
}

//adding coupon 

const couponAdd = async (req, res) => {

    let { expDate, minAmount, couponCode, discountPercentage } = req.body;

    expDate = dateFormat.stringToDate(expDate, "yyyy-mm-dd", "-");


    let cop = await Coupon.findOne({ couponCode });

    // console.log("coop",cop);


    let add;
    let error = "";

    if (cop) {
        add = false;

        error = "cupon exites " + cop;
        req.flash('message', "coupen name is exits");

        res.redirect("/admin/coupon");





    } else {

        const coupon = new Coupon({ expDate, minAmount, couponCode, discountPercentage });
        try {
            await coupon.save();
            add = true;
            res.redirect("/admin/coupon");


        } catch (err) {
            console.log(err);

            req.flash('message', "something is worng");
            res.redirect("/admin/coupon");
            add = false

        }
    }



}


const couponDelete = async (req, res) => {
   
    console.log(req.body);
    let isDelete;
    const id = mongoose.Types.ObjectId(req.body.id);
    try {
        await Coupon.findByIdAndDelete(id)
        isDelete = true;

    } catch (err) {
        console.log(err);
        isDelete = false;

    }

    res.send({ isDelete })

}





const applyCoupen = async (req, res) => {

    


    try {
        const usercode = req.params.id
        console.log(usercode);
        const code = await Coupon.find({ couponCode: usercode })
        console.log(code);
        if (code) {
            console.log("code", code);
            if (code[0].expDate > Date.now()) {


                


                const userId = req.session.userId

              

                const user = await CheckoutData.findOneAndUpdate({ userId: userId }, { coupenCode: usercode })
             

                const discount = code[0]


                res.send({ success: discount })
                
                console.log(res.send);
            } else {
                console.log("expired", code);
                await Coupon.findOneAndDelete({ coupenCode: usercode })
                req.flash('error', 'Invalid code')
                res.redirect('back')
            }
        } else {
            req.flash('error', 'Invalid code')
            res.redirect('back')
        }
    } catch (err) {
        // res.render('error',{err})
    }
}



module.exports = {
    adminCouponPage,
    couponAdd,
    couponDelete,
    applyCoupen,
}