const Team = require('../models/teamModel');

exports.createTeam = (req, res) => {
    const team = new Team(req.body); 

    team.save()
    .then((team) => {
        return res.status(201).json({team})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getOneTeamById = (req, res) => {
    const idTeam = req.params.idTeam;

    Team.findOne({idTeam: idTeam})
    .then((team) => { return res.status(200).json({team})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getAllTeams = (req, res) => {

    Team.find()
    .then((team) => { return res.status(200).json({team})})
    .catch((error) => { return res.status(400).json({error})});
}
