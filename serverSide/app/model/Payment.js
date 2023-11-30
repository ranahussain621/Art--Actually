var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    reciever_id: {
        type: String,
        required: true
    },
    art_id: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },

    date: {
        type: String,
    },
    art_actualy_amount:{
        type: String,
        default: 0,
    },
    artist_amount:{
        type: String,
        default: 0,
    },
    

});

var Payment = new mongoose.model('payments', schema);

module.exports = Payment;