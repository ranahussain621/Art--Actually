var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    cat_id: {
        type: String,
        required: true,
    },
    blog_id: {
        type: String,
        required: true
    },

});

var BlogCats = new mongoose.model('blogcats', schema);

module.exports = BlogCats;