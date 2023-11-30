var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    art_id: {
        type: String,
        required: function() {
            return this.music_id ? false : true;
        },
    },
    music_id: {
        type: String,
        required: function() {
            return this.art_id ? false : true;
        },
    },
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1, 
    },
});

var Favourite = new mongoose.model('favourites', schema);

module.exports = Favourite;