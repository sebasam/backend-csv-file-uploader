const { Schema, model } = require('mongoose')

const fileSchema = Schema({
    data: {
        type: Map,
        of: String,
        required: true
    }
})

module.exports = model('File', fileSchema)