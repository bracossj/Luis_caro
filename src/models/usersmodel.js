const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    tweets: [{
        text: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        },
        likes: {
            type: Number,
            required: false
        }
    }],
    megustan: [{
        txt: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        }
    }],
    seguidos: [{
        type: String,
        ref: 'User',
        required: false
    }],
    seguidores: [{
        type: String,
        ref: 'User',
        required: false
    }]
});

module.exports = mongoose.model('User', userSchema);