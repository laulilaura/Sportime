const Pratique = require('../models/pratiqueModel');
const jwtUtils = require('../utils/jwt.utils');

exports.createPratique = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const pratique = new Pratique(req.body);

    pratique.save()
    .then((pratique) => {
        return res.status(201).json({pratique})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getAllPratique = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'error': 'Bad token'});
    }

    Pratique.find()
    .then((pratiques) => { return res.status(200).json({pratiques})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getOnePratiqueById = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const idPratique = req.params.id;

    Pratique.findOne({_id: idPratique})
    .then((pratique) => { return res.status(200).json({pratique})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPratiquesByUserid = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const idUser = req.params.userId;

    Pratique.find({idUser: idUser})
    .then((pratique) => { return res.status(200).json({pratique})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPratiquesBySport = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const idSport = req.params.idSport;

    Pratique.find({idSport: idSport})
    .then((pratique) => { return res.status(200).json({pratique})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPratiquesByNiveau = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const idNiveau = req.params.niveau;

    Pratique.find({niveau: idNiveau})
    .then((pratique) => { return res.status(200).json({pratique})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.putPratique = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const id = req.params.id;

    Pratique.findOne({_id: id})
    .then ((pratique) => { 
        pratique.idSport = req.body.idSport,
        pratique.idUser = req.body.idUser,
        pratique.niveau = req.body.niveau,
        pratique.avis = req.body.avis
        pratique.save()
        .then((pratique) => {
            return res.status(200).json({pratique});
        })
        .catch((error) => {
            return res.status(400).json ( {error} );
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

exports.delPratique = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const id = req.params.id;

    Pratique.deleteOne({_id: id})
    .then((pratique) => { return res.status(200).json( {pratique} )})
    .catch((error) => { return res.status(400).json( {error} )});
};
