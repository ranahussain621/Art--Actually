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

var UserVarifyToken = new mongoose.model('uservarifytokens', schema);

module.exports = UserVarifyToken;