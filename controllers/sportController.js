const Sport = require('../models/sportModel');

exports.createSport = (req, res) => {
    const sport = new Sport(req.body);

    sport.save()
    .then((sport) => {
        return res.status(201).json({sport})
    })
    .catch((error) => {return res.status(400).json({error}) });
}