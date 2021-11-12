const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please provide name value'],
        maxLength: 20,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'caressa', 'marcos', 'liddy'],
            message: '{VALUE} not supported'
        }
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', productSchema )