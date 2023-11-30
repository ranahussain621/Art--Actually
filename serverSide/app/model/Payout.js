var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    reciever_id: {
        type: String,
        required: true
    },
   
    amount: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Paids",
    },
    receipt : {
        type: String,
        default: null,
    },

    date: {
        type: String,
    },

});

var Payout = new mongoose.model('payouts', schema);

module.exports = Payout;