var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
        required: true
    },

});

var forgetToken = new mongoose.model('forgettokens', schema);

module.exports = forgetToken;