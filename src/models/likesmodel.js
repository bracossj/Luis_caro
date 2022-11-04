const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({

    like: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweets: {
        type: mongoose.Types.ObjectId,
        ref: 'Tweet',
        required: true
    }
})

module.exports = mongoose.model('Likes', likeSchema)