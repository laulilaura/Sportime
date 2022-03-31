const jwtUtils = require('../utils/jwt.utils');
const Team = require('../models/teamModel');

exports.createTeam = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const admin = jwtUtils.getAdmin(headerAuth);
    if (!admin) {
        return res.status(401).json({ 'error': 'non admin'});
    }

    const team = new Team(req.body); 
    console.log(team)

    team.save()
   .then((team) => {
        return res.status(200).json({team})
    })
   .catch( (error) => { 
    console.log(error);
    return res.status(400).json({error}) });
}

exports.getOneTeamById = (req, res) => {
    const idTeam = req.params.idTeam;

    Team.findOne({_id: idTeam})
    .then((team) => { return res.status(200).json({team})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getAllTeams = (req, res) => {
    Team.find()
    .then((team) => { return res.status(200).json({team})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.putTeam = (req, res) => {
    const id = req.params.id;

    Team.findOne({_id: id})
    .then ((team) => { 
        team.nomTeam = req.body.nomTeam,
        team.Description = req.body.Description,
        team.dateCreation = req.body.dateCreation
        team.save()
        .then((team) => {
            return res.status(200).json({team});
        })
        .catch((error) => {
            return res.status(400).json ( {error} );
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

exports.delTeam = (req, res) => {
    const id = req.params.id;

    Team.deleteOne({_id: id})
    .then((team) => { return res.status(200).json( {team} )})
    .catch((error) => { return res.status(400).json( {error} )});
};
