const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userAddres:[{

        Firstname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Lastname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    houseNo: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: Number,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true
    },
    

}]
    // { timestamps: true }
})

module.exports = mongoose.model('addressData', addressSchema)

