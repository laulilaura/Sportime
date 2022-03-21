const mongoose = require('mongoose');

const spot = mongoose.Schema({
   nomSpot: {
      type: String,
      required: true
   },
   ville: {
      type: String,
      required: true
   },
   adresse: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('spot', spot);