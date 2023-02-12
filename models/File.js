const { Schema, model } = require('mongoose')

const fileSchema = Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

module.exports = model('File', fileSchema)