const mongoose = require('mongoose');

const { Schema } = mongoose;
const playListSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Playlist must have name'],
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'song',
            required: true,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
module.exports = mongoose.model('Playlist', playListSchema);