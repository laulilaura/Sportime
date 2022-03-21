const mongoose = require('mongoose');

const team = mongoose.Schema({
    nomTeam: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String
    },
    dateCreation :{
        type: Date,
        default: Date.now
    }

 });

 module.exports = mongoose.model('team', team);