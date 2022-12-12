const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({
    highlight: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        url: String,
        filename: String
    }],
    date: {
        type: Date
    }
})

module.exports = mongoose.model('Hero',heroSchema)