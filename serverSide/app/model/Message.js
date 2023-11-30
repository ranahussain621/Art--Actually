var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    reciver_id: {
        type: String,
        required: true,
    },
    chat_id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    

});

var Message = new mongoose.model('messages', schema);

module.exports = Message;