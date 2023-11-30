var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    role_id: {
        type: String,
        default: null,
        required: true
    },

});

var userRole = new mongoose.model('userroles', schema);

module.exports = userRole;