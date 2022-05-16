const mongoose = require('mongoose')
const {mongo} = require("mongoose");

const conceptSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('conceptModel', conceptSchema)