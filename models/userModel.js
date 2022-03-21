 const mongoose = require('mongoose');

 const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    estAdmin: {
        type: Boolean,
        default: false
    },
    nom: {
        type: String,
        required: true
    },
    prenom :{
        type: String,
        required: true
    },
    ville_fav: {
        type: String
    },
    tel: {
        type: Number
    },
    dateNaissance :{
        type: Date,
        required: true,
        min: '2009-01-01'
    },
    mdp: {
        type: String,
        required: true
    }

 });

 module.exports = mongoose.model('utilisateur', user);