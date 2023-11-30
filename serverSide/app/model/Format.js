var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

});

var Format = new mongoose.model('formats', schema);

module.exports = Format;