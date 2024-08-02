const mongoose = require("mongoose");

const tourModel = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    rating: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    location: {
        type: String,
        default: ""
    },
    price: {
        type: Number, // Changed from String to Number
        required: true // Ensure that price is always provided
    },
    expect: [{
        step: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            name: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Tour', tourModel);
