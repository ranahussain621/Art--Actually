var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    bankName:{
        type:String,
        required:true
    },
    branchNumber:{
        type:String,
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    routingNumber:{
        type:Number,
        required:true
    },
    bankAccountNumber:{
        type:Number,
        required:true
    }
});

var Collection = new mongoose.model('BankAccountDetail', schema);

module.exports = Collection;