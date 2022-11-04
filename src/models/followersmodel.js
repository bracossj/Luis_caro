const mongoose = require("mongoose")

const followerSchema = mongoose.Schema({

    seguidor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seguido: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = mongoose.model('Follower', followerSchema)