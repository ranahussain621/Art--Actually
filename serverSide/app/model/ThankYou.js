var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

var Collection = new mongoose.model('ThankYou', schema);

module.exports = Collection;