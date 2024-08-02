const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLength: 25,
    },

    email: {
        type: String,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userModel)