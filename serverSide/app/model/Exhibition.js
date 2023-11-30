var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image: {
        type: Array,
        required: true
    },
    status:{
        type: String,
    }
});

var Collection = new mongoose.model('Exhibition', schema);

module.exports = Collection;