const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const TEL_REGEX = /^(\+33|0)[1-9](\d\d){4}$/;
const MDP_REGEX = /^([ a-zA-Z0-9@ *#]{7,15})$/;


//////////////////////////////////// CREATE

exports.createUser = (req, res) => {
    const nom = req.body.nom;
    const mdp = req.body.mdp;
    const prenom = req.body.prenom;
    const username = req.body.username;
    const tel = req.body.tel;

    if (nom == null || mdp == null || prenom == null || username == null || tel == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!TEL_REGEX.test(tel)) {
        return res.status(400).json({ 'erreur': 'téléphone non valide, il doit commencer par un 0 ou +33 et doit comporter 9 autres numéros' });
    };
    if (!MDP_REGEX.test(mdp)) {
        return res.status(400).json ({ 'erreur': 'mot de passe non valide Le mot de passe doit comporter au moins 7 caractères et pas plus de 15 caractères.'});
    };

    User.findOne({username: username})
        .then((userFound) => {
            if (!userFound) {
                bcrypt.hash(mdp, 5, function( err, bcryptedPassword ){
                    const newUser = User.create({ 
                        username: username,
                        estAdmin: false,
                        nom: nom,
                        prenom: prenom,
                        ville_fav: req.body.ville_fav,
                        tel: tel,
                        dateNaissance: req.body.dateNaissance,
                        mdp: bcryptedPassword,
                        team: req.body.team,
                    })
                    .then((newUser) => {
                        console.log(newUser);
                        return res.status(201).json({'userId': newUser.id});
                    })
                    .catch((err) => {
                        return res.status(400).json({err});
                    });
                });
            }
            else {
                return res.status(409).json ({ 'erreur': 'ce nom d\'utilisateur existe déjà' });
            }
        })
        .catch((err) => {return res.status(500).json({ err });
    });
};

//////////////////////////////////// LOGIN

exports.loginUser = (req, res) => {
    const username = req.body.username; 
    const mdp = req.body.mdp; 
    if (username == null || mdp == null) {  
        return res.status (400).json({ 'erreur': 'paramètre manquant' });
    }

    User.findOne({username: username})
    .then((userFound) => {
        console.log(userFound);
        if (userFound) {
            bcrypt.compare(mdp, userFound.mdp, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status (200).json({
                        '_id': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                } 
                else {
                    return res.status(403).json({ 'erreur': 'mot de passe invalide' });
                };
            });
        }
        else {
            return res.status(404).json({ 'erreur': 'utilisateur inexistant'});
        }
    })
    .catch((err) => { return res.status(500).json( {'erreur': 'incapable de vérifier l\'utilisateur'} )});
};

//////////////////////////////////// GET

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

//////////////////////////////////// PUT

exports.putUser = (req, res) => {
    const id = req.params.id;
    const mdp = req.body.mdp;

    if (mdp == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!MDP_REGEX.test(mdp)) {
        return res.status(400).json ({ 'erreur': 'mot de passe non valide Le mot de passe doit comporter au moins 7 caractères et pas plus de 15 caractères.'});
    };

    User.findOne({_id: id})
    .then ((user) => {
        bcrypt.hash(mdp, 5, function( err, bcryptedPassword ){
            user.username = req.body.username,
            user.prenom = req.body.prenom,
            user.nom = req.body.nom,
            user.ville_fav = req.body.ville_fav,
            user.tel = req.body.tel,
            user.dateNaissance = req.body.dateNaissance,
            user.team = req.body.team,
            user.mdp = bcryptedPassword
            user.save()
            .then((user) => {
                return res.status(200).json({user});
            })
            .catch((error) => {
                return res.status(400).json ( {error} );
            });
        });
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

//////////////////////////////////// DELETE

exports.delUser = (req, res) => {
    const id = req.params.id;

    User.deleteOne({_id: id})
    .then((user) => { return res.status(200).json( {user} )})
    .catch((error) => { return res.status(400).json( {error} )});
};


/*{
    username: req.body.username,
    estAdmin: false,
    nom: req.body.nom,
    prenom: req.body.prenom,
    ville_fav: req.body.ville_fav,
    tel: req.body.tel,
    dateNaissance: req.body.dateNaissance,
    mdp: req.body.mdp
}*/



/*
select * from table where abc like %v%

var name="john";
UserSchema.find({name: { $regex: '.*' + name + '.*' } }).limit(5);

https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose
*/