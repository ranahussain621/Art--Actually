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

    file: { type: Array },
    owner_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1,
    },
    mood: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    instrument: {
        type: String,
        required: true
    },
    vocals: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    image: {
        type: Array,
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

var Sound = new mongoose.model('sounds', schema);

module.exports = Sound;