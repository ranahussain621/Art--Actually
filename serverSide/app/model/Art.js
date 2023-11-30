var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1,
    },
    format: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    dimension1: {
        type: String,
        required: true
    },
    dimension2: {
        type: String,
        required: true
    },
    dimension3: {
        type: String,
        required: true
    },
    dimension4: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    donation: {
        type: String,
        required: true
    },

    created_at: {
        type: String,
        required: true
    },
});

var Art = new mongoose.model('arts', schema);

module.exports = Art;