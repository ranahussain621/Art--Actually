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
    date: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default:1,
    },
});

var Event = new mongoose.model('events', schema);

module.exports = Event;