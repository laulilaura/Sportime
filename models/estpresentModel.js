const mongoose = require('mongoose');

const presence = mongoose.Schema({
    idSpot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spot',
        required: true
    },
    idUser: { //UNIQUE A UN TEMPS DONNE
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    idSport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sport',
        required: true
    },
    date: {
       type: Date,
       required: true
    },
    heure: {
       type: String, // PAS BEAU
       required: true
    },
    nbPresent: {
       type: Number,
       min: 1,
       required: true
    }
});


module.exports = mongoose.model('estpresent', presence);