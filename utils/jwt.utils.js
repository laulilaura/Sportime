const jwt = require('jsonwebtoken'); 
const JWT_SECRET_SIGN = '032btty34tfx8gz5dA9rjs6gf9mks95fdgg861f4dIxf6rfcfchvpFDSxmNN86572rfgvcdfzn5Bpgdc68g2cc';

module.exports ={
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData._id,
            userUsername: userData.username,
            userNom: userData.nom,
            userPrenom: userData.prenom,
            admin: userData.estAdmin
        },
        JWT_SECRET_SIGN,
        {
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getId: function(authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SECRET_SIGN);
                if (jwtToken != null) {
                    userId = jwtToken.userId;
                }
            }
            catch(err) {}
        }
        return userId;
    },
    getAdmin: function(authorization) {
        var admin = false;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SECRET_SIGN);
                if (jwtToken != null) {
                    admin = jwtToken.admin;
                }
            }
            catch(err) {}
        }
        return admin;
    }
};