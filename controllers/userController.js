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
};

exports.getAllUsers = (req, res) => {

    User.find()
    .then((users) => { return res.status(200).json({users})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getOneUserById = (req, res) => {
    const idUser = req.params.id;

    User.findOne({_id: idUser})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getOneUserByUsername = (req, res) => {
    const username = req.params.username;

    User.findOne({username: username})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getUsersByTeam = (req, res) => {
    const idTeam = req.params.idTeam;

    User.find({team: idTeam})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getUsersByVilleFav = (req, res) => {
    const ville_favorite = req.params.ville_fav;

    User.find({ville_fav: ville_favorite})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.putUser = (req, res) => {
    const id = req.params.id;

    User.findOne({_id: id})
    .then ((user) => { 
        user.prenom = req.body.prenom,
        user.nom = req.body.nom,
        user.ville_fav = req.body.ville_fav,
        user.tel = req.body.tel,
        user.dateNaissance = req.body.dateNaissance,
        user.mdp = req.body.mdp,
        user.team = req.body.team
        user.save()
        .then((user) => {
            return res.status(200).json({user});
        })
        .catch((error) => {
            return res.status(400).json ( {error} );
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

exports.delUser = (req, res) => {
    const id = req.params.id;

    User.deleteOne({_id: id})
    .then((user) => { return res.status(200).json( {user} )})
    .catch((error) => { return res.status(400).json( {error} )});
};


/*
select * from table where abc like %v%

var name="john";
UserSchema.find({name: { $regex: '.*' + name + '.*' } }).limit(5);

https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose
*/