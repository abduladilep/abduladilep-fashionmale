
const mongoose = require('mongoose')
// validator = require("mongoose-unique-validator")



const userSchema = new mongoose.Schema({

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
    Password: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },

    state: {
        type: Boolean,
        required: true,

    },
    userAddres:[{

        Firstname: {
        type: String,
        required: true,
        trim: true,
    },
    Lastname: {
        type: String,
        required: true,
        trim: true
    },

    Email: {
        type: String,
        required: true,
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

}],


})
// userSchema.plugin(validator)



module.exports = mongoose.model('User', userSchema)