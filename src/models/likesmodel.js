const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({

    like: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tuit: {
        type: mongoose.Types.ObjectId,
        ref: 'Tuit',
        required: true
    }
})

module.exports = mongoose.model('Likes', likeSchema)