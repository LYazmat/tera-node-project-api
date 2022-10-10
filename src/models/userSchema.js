const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fistname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    celphone: {
        type: Number,
        required: false
    },
    telphone: {
        type: Number,
        required: false
    },
    cep: {
        type: Number,
        require: false
    },
    logradouro: {
        type: String,
        required: false
    },
    number: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    instagran: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('user', userSchema)