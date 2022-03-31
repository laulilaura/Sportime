const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const TEL_REGEX = /^(\+33|0)[1-9](\d\d){4}$/;
const MDP_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
	


//////////////////////////////////// CREATE

exports.createUser = (req, res) => {
    const nom = req.body.nom;
    const mdp = req.body.mdp;
    const prenom = req.body.prenom;
    const username = req.body.username;
    const tel = req.body.tel;
    const villeFave = req.body.ville_fav.toLowerCase();

    if (nom == null || mdp == null || prenom == null || username == null || tel == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!TEL_REGEX.test(tel)) {
        return res.status(400).json({ 'erreur': 'téléphone non valide, il doit commencer par un 0 ou +33 et doit comporter 9 autres numéros' });
    };
    if (!MDP_REGEX.test(mdp)) {
        return res.status(400).json ({ 'erreur': 'mot de passe non valide. Le mot de passe doit comporter entre 8 et 20 charactères dont au moins une lettre minuscule, une majuscule et un chiffre.'});
    };

    User.findOne({username: username})
        .then((userFound) => {
            if (!userFound) {
                bcrypt.hash(mdp, 5, function( err, bcryptedPassword ){
                    const newUser = User.create({ 
                        username: username,
                        estAdmin: req.body.estAdmin,
                        nom: nom,
                        prenom: prenom,
                        ville_fav: villeFave,
                        tel: tel,
                        dateNaissance: req.body.dateNaissance,
                        mdp: bcryptedPassword,
                        team: req.body.team,
                    })
                    .then((newUser) => {
                        return res.status (200).json({
                            'userId': newUser._id,
                            'token': jwtUtils.generateTokenForUser(newUser)
                        });
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
    .catch((err) => { return res.status(500).json( {err} )});
};

//////////////////////////////////// LOGIN ADMIN

exports.loginAdmin = (req, res) => {
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
                    console.log(userFound);
                    console.log(userFound.estAdmin);
                    if(userFound.estAdmin==true){
                        return res.status (200).json({
                            '_id': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound),
                            'admin' : true
                        });
                    } else {
                        return res.status(401).json({ 'erreur': 'utilisateur non autorisé' });
                    }
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
    .catch((err) => { return res.status(500).json( {err} )});
};

//////////////////////////////////// GET

exports.getAllUsers = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const admin = jwtUtils.getAdmin(headerAuth);
    if (!admin) {
        return res.status(401).json({ 'error': 'Bad token'});
    }
    User.find()
    .then((users) => { return res.status(200).json({users})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getOneUserById = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const idUser = req.params.id;

    User.findOne({_id: idUser})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getOneUserByUsername = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const username = req.params.username;

    User.findOne({username: username})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getUsersByTeam = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const idTeam = req.params.idTeam;

    User.find({team: idTeam})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

exports.getUsersByVilleFav = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const ville_favorite = req.params.ville_fav;

    User.find({ville_fav: ville_favorite})
    .then((user) => { return res.status(200).json({user})})
    .catch((error) => { return res.status(400).json({error})});
};

//////////////////////////////////// PUT

exports.putUser = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }

    const id = req.params.id;
    const mdp = req.body.mdp;

    if (mdp == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!MDP_REGEX.test(mdp)) {
        return res.status(400).json ({ 'erreur': 'mot de passe non valide. Le mot de passe doit comporter entre 8 et 20 charactères dont au moins une lettre minuscule, une majuscule et un chiffre.'});
    };

    User.findOne({_id: id})
    .then ((user) => {
        bcrypt.hash(mdp, 5, function( err, bcryptedPassword ){
            user.username = (req.body.username ? req.body.username : user.username),
            user.nom = (req.body.nom ? req.body.nom : user.nom),
            user.prenom = (req.body.prenom ? req.body.prenom : user.prenom),
            user.ville_fav = (req.body.ville_fav ? req.body.ville_fav.toLowerCase() : user.ville_fav),
            user.tel = (req.body.tel ? req.body.tel : user.tel),
            user.dateNaissance = (req.body.dateNaissance ? req.body.dateNaissance : user.dateNaissance),
            user.team = (req.body.team ? req.body.team : user.team),
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


exports.putUserTeam = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Bad token'});
    }
    const id = req.params.id;

    User.findOne({_id: id})
    .then ((user) => {
        user.username = user.username,
        user.nom = user.nom,
        user.prenom = user.prenom,
        user.ville_fav = user.ville_fav,
        user.tel = user.tel,
        user.dateNaissance = user.dateNaissance,
        user.team = req.body.team,
        user.mdp = user.mdp
        user.save()
        .then((user) => {
            return res.status(200).json({user});
        })
        .catch((error) => { return res.status(401).json( {error} )});
    })
    .catch((error) => { return res.status(400).json( {error} )});
};

//////////////////////////////////// DELETE

exports.delUser = (req, res) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getId(headerAuth);
    if (userId < 0) {
        return res.status(401).json({ 'error': 'Bad token'});
    }

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