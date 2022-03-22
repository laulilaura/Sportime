const mongoose = require('mongoose');

const pratique = mongoose.Schema({
   idSport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sport',
        required: true
   },
   idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
   },
   niveau :{
       type: String,
       enum: [1, 2, 3, 4, 5],
       required: true
   },
   avis: {
       type: String
   }

});

module.exports = mongoose.model('pratique', pratique);
