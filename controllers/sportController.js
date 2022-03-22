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

exports.getOneSportByName = (req, res) => {
    const nameSport = req.params.name;

    Sport.findOne({nomSport: nameSport})
    .then((sport) => { return res.status(200).json({sport})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.putSport = (req, res) => {
    const id = req.params.id;

    Sport.findOne({_id: id})
    .then ((sport) => { 
        sport.nomSport = req.body.nomSport,
        sport.categorie = req.body.categorie,
        sport.description = req.body.description
        sport.save()
        .then((sport) => {
            return res.status(200).json({sport});
        })
        .catch((error) => {
            return res.status(400).json ( {error} );
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

exports.delSport = (req, res) => {
    const id = req.params.id;

    Sport.deleteOne({_id: id})
    .then((sport) => { return res.status(200).json( {sport} )})
    .catch((error) => { return res.status(400).json( {error} )});
};
