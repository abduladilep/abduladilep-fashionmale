
const mongoose = require('mongoose')
validator = require("mongoose-unique-validator")



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

    }


})
userSchema.plugin(validator)



module.exports = mongoose.model('User', userSchema)