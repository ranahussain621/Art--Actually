var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sender_id: {

        type: String,
        required: true
    },
    reciver_id: {
        type: String,
        required: true,
    }

});

var Chat = new mongoose.model('chats', schema);

module.exports = Chat;