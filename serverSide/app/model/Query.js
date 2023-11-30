var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },

});

var Query = new mongoose.model('queries', schema);

module.exports = Query;