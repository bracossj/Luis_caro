const mongoose = require("mongoose")

const followerSchema = mongoose.Schema({

    seguido: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seguidor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Follower', followerSchema)