var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

});

var SoundFormat = new mongoose.model('soundformats', schema);

module.exports = SoundFormat;