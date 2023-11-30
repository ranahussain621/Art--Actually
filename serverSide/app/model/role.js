var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

});

var role = new mongoose.model('roles', schema);

module.exports = role;