var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sound_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sounds'
    },
    visibility:{
        type:String,
        required:true
    },
    donation:{
        type:String,
        required:true
    }
});

var Sound = new mongoose.model('Visibility', schema);

module.exports = Sound;