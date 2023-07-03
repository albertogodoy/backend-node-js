const { model, Schema} = require('mongoose');

const songSchema = new Schema({
    title: String,
    artist: String,
    genero: String,
    album: String,
    duration: String,
    year: Number,
    tracknumber: Number,
    isExplicit: Boolean
});

module.exports = model('song', songSchema);