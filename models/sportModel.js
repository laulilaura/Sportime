const mongoose = require('mongoose');

const sport = mongoose.Schema({
    nomSport: {
       type: String,
       required: true,
       unique: true
   },
   categorie: {
       type: String,
       enum: ['equipe', 'solo']
   },
   description: {
       type: String,
       required: true
   }

});

module.exports = mongoose.model('sport', sport);