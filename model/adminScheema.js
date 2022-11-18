const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const adminSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Password: {
        type: String,
        required: true,
        trim: true,
    },

    state: {
        type: Boolean,
        required: true,

    }



})

adminSchema.plugin(validator)


module.exports = mongoose.model('Admin', adminSchema)