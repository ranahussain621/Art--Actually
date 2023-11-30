var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    charge_id: {
        type: String,
        default: null,
    },
    art_id: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1,
    },
    client_name: {
        type: String,
        required: true,
    },
    country_name: {
        type: String,
        required: true,
    },
    address_line_1: {
        type: String,
        required: true,
    },
    address_line_2: {
        type: String,
        default: null,
    },
    district: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },

});

var Sales = new mongoose.model('sales', schema);

module.exports = Sales;