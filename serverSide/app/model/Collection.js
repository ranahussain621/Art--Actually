var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sound_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sounds'
    }],

});

var Collection = new mongoose.model('Collection', schema);

module.exports = Collection;