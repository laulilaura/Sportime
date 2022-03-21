const Sport = require('../models/sportModel');

exports.createSport = (req, res) => {
    const sport = new Sport(req.body);

    sport.save()
    .then((sport) => {
        return res.status(201).json({sport})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getAllSports = (req, res) => {
    Sport.find()
    .then((sports) => { return res.status(200).json({sports})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getOneSportById = (req, res) => {
    const idSport = req.params.idSport;

    Sport.findOne({_id: idSport})
    .then((sport) => { return res.status(200).json({sport})})
    .catch((error) => { return res.status(400).json({error})});
}
