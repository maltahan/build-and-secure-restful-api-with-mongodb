const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const { Schema } = mongoose;

const songSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Song must have tiltle'],
    },
    url: {
        type: String,
        required: ['true', 'Song must have url'],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,

    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});
songSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("song",songSchema);