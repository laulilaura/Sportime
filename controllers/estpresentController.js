const EstPresent = require('../models/estpresentModel');

exports.createPresence = (req, res) => {
    const presence = new EstPresent(req.body);

    presence.save()
    .then((presence) => {
        return res.status(201).json({presence})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getAllPresences = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    EstPresent.find()
    .then((presences) => { return res.status(200).json({presences})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPresenceBySport = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const idSport = req.params.idSport;

    EstPresent.find({idSport: idSport})
    .then((presences) => { return res.status(200).json({presences})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPresenceBySpot = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const idSpot = req.params.idSpot;

    EstPresent.find({idSpot: idSpot})
    .then((presences) => { return res.status(200).json({presences})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPresenceByUser = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const idUser = req.params.idUser;

    EstPresent.find({idUser: idUser})
    .then((presences) => { return res.status(200).json({presences})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getPresenceByDate = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const Date = req.params.date;

    EstPresent.find({date: Date})
    .then((presences) => { return res.status(200).json({presences})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.putPresence = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const id = req.params.id;

    EstPresent.findOne({_id: id})
    .then ((presence) => { 
        presence.idSpot = req.body.idSpot,
        presence.idUser = req.body.idUser,
        presence.idSport = req.body.idSport,
        presence.date = req.body.date,
        presence.heure = req.body.heure,
        presence.nbPresent = req.body.nbPresent
        presence.save()
        .then((presence) => {
            return res.status(200).json({presence});
        })
        .catch((error) => {
            return res.status(400).json ( {error} );
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

exports.delPresence = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const id = req.params.id;

    EstPresent.deleteOne({_id: id})
    .then((presence) => { return res.status(200).json( {presence} )})
    .catch((error) => { return res.status(400).json( {error} )});
};
