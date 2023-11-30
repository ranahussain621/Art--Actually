var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

});

var Style = new mongoose.model('styles', schema);

module.exports = Style;