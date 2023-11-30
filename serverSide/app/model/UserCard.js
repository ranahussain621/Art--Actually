var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    card_number: {
        type: String,
        required: true
    },
    card_expiry: {
        type: String,
        required: true
    },
    card_cvc: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        default: null
    },
    district: {
        type: String,
        default: null
    },
    area: {
        type: String,
        default: null
    },

});

var UserCard = new mongoose.model('usercards', schema);

module.exports = UserCard;