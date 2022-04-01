const Spot = require('../models/spotModel');
const jwtUtils = require('../utils/jwt.utils');

exports.createSpot = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const spot = new Spot(req.body);

    spot.save()
    .then((spot) => {
        return res.status(201).json({spot})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getAllSpot = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'error': 'Bad token'});
    }
    console.log(userId)
    Spot.find()
    .then((spots) => { return res.status(200).json({spots})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getOneSpotById = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const idSpot = req.params.id;

    Spot.findOne({_id: idSpot})
    .then((spot) => { return res.status(200).json({spot})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getOneSpotByName = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const nomSpot = req.params.nomSpot;

    Spot.findOne({nomSpot: nomSpot})
    .then((spot) => { return res.status(200).json({spot})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getSpotsByVille = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const villeSpot = req.params.nomVille;

    Spot.find({ville: villeSpot})
    .then((spot) => { return res.status(200).json({spot})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.putSpot = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
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
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const id = req.params.id;

    Spot.deleteOne({_id: id})
    .then((spot) => { return res.status(200).json( {spot} )})
    .catch((error) => { return res.status(400).json( {error} )});
};

