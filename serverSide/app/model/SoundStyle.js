var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

});

var SoundStyle = new mongoose.model('soundstyles', schema);

module.exports = SoundStyle;