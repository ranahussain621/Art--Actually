var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: null,
        required: true
    },
    lastName: {
        type: String,
        default: null,
        required: true
    },
    password: {
        type: String,
        default: null,
        // required: true
    },
    status: {
        type: String,
        default: 1,
    },
    vip: {
        type: String,
        default: false,
    },
    website: {
        type: String,
        default: false,
    },
    profession: {
        type: String,
        default: false,
    },
    instagram: {
        type: String,
        default: false,
    },
    school: {
        type: String,
        default: false,
    },
    facebook: {
        type: String,
        default: false,
    },
    other: {
        type: String,
        default: false,
    },
    userName: {
        type: String,
        default: false,
    },
    phone: {
        type: String,
        default: null,
    },
    image: {
        type: Array,
        default: null,
    },
    payment:{
        type: String,
        default: false,
    },
    subscribe:{
        type: String,
        default: false,
    },
    email_verified_at: {
        type: String,
        default: null,
    },
    sub_id:{
        type: String,
        default: null,
    }

});

var user = new mongoose.model('User', schema);

module.exports = user;