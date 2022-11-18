const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    wishlistItems: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ]
})

module.exports = mongoose.model('Wishlist', wishlistSchema)