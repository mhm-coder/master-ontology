const mongoose = require('mongoose')

const conceptSchema = mongoose.Schema({
    conceptId: {
        type: Number,
        required: true
    },
    displayName: {
        type: String,
        required: [true, 'Please add a text value']
    },
    description: {
        type: String,
        required: [true, 'Please add a text value']
    },
    childIds: {
        type: String,
    },


}, {
    timestamps: true
})

module.exports = mongoose.model('concept', conceptSchema)