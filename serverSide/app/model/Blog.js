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
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1,
    },
    date: {
        type: String,
        required: true
    },
});

var Blog = new mongoose.model('blogs', schema);

module.exports = Blog;