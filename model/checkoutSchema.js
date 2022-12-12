const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
   
        address: {
            type: String,
            required: true,
            trim: true


        },
    
    paymentStatus: {
        type: String,
        enum: ["cod", "Online"],
        required: true
    },
    bill: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    orderStatus: [{
        type: {
            type: String,
            enum: ["Ordered", "Packed", "Shipped", "Delivered", "Cancelled"],
            default: "Ordered"
        },
        date: {
            type: Date,
            default: Date.now()
        },
    }],
onlinePaymentSuccess:{

    type: Boolean,
    defualt:false
},

    isCompleted: {
        type: Boolean,
        default: false
    },
    expectedDate: {
        type: Date,
        default: () => new Date(+ new Date() + 7 * 24 * 60 * 1000)
    },
     coupenCode: {
        type: String,
       
    },
}, { timestamps: true })

module.exports = mongoose.model("Checkout", checkoutSchema)