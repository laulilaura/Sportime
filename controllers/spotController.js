const Spot = require('../models/spotModel');

exports.createSpot = (req, res) => {
    const spot = new Spot(req.body);

    spot.save()
    .then((spot) => {
        return res.status(201).json({spot})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getAllSpot = (req, res) => {

    Spot.find()
    .then((spots) => { return res.status(200).json({spots})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getOneSpotById = (req, res) => {
    const idSpot = req.params.id;

    Spot.findOne({_id: idSpot})
    .then((spot) => { return res.status(200).json({spot})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getOneSpotByName = (req, res) => {
    const nomSpot = req.params.nomSpot;

    Spot.findOne({nomSpot: nomSpot})
    .then((spot) => { return res.status(200).json({spot})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getSpotsByVille = (req, res) => {
    const villeSpot = req.params.nomVille;

    Spot.find({ville: villeSpot})
    .then((spot) => { return res.status(200).json({spot})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.putSpot = (req, res) => {
    const id = req.params.id;

    Spot.findOne({_id: id})
    .then ((spot) => { 
        spot.nomSpot = req.body.nomSpot,
        spot.ville = req.body.ville,
        spot.adresse = req.body.adresse
        spot.save()
        .then((spot) => {
            return res.status(200).json({spot});
        })
        .catch((error) => {
            return res.status(400).json ( {error} );
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

exports.delSpot = (req, res) => {
    const id = req.params.id;

    Spot.deleteOne({_id: id})
    .then((spot) => { return res.status(200).json( {spot} )})
    .catch((error) => { return res.status(400).json( {error} )});
};

