const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    valecita: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: String,
        ref: 'User',
        required: false
    }]
});

module.exports = mongoose.model('Tweet', tweetSchema);