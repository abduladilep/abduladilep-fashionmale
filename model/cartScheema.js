const mongoose = require("mongoose");
// const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


const cartScheema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    cartItem: [{

        ProductId: {
            type:mongoose.Schema.Types.ObjectId,
            // ref:"products"
        },
        

        price: {
            type: Number,

        },
        quantity: {
            type: Number,
            require: true
        },

    }],

    couponCode: {
        type: String,
       
    },
   
})


const CartItem = mongoose.model("CartItem", cartScheema)

module.exports = CartItem