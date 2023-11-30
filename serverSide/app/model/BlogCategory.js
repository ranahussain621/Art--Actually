var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

});

var BlogCategory = new mongoose.model('blogcategories', schema);

module.exports = BlogCategory;