const User = require('../models/userModel');

exports.createUser = (req, res) => {
    const user = new User(req.body); /*{
        username: req.body.username,
        estAdmin: false,
        nom: req.body.nom,
        prenom: req.body.prenom,
        ville_fav: req.body.ville_fav,
        tel: req.body.tel,
        dateNaissance: req.body.dateNaissance,
        mdp: req.body.mdp
    }*/

    user.save()
    .then((user) => {
        return res.status(201).json({user})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

exports.getOneUserByUsername = (req, res) => {
    const username = req.params.username;

    User.findOne({username: username})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
}

exports.getAllUsers = (req, res) => {

    User.find()
    .then((users) => { return res.status(200).json({users})})
    .catch((error) => { return res.status(400).json({error})});
}