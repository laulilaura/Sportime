const express = require('express');
const router = express.Router();
const TeamCtrl = require('../controllers/teamController');

router.post('/', TeamCtrl.createTeam);

module.exports = router;

/*
{
    "nomTeam": "Wildrun",
    "Description": "Nous somme une autre team de parkour"
}
*/