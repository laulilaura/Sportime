const express = require('express');
const router = express.Router();
const TeamCtrl = require('../controllers/teamController');

router.post('/', TeamCtrl.createTeam);

router.get('/', TeamCtrl.getAllTeams);
router.get('/:idTeam', TeamCtrl.getOneTeamById);

router.put('/:id', TeamCtrl.putTeam);

router.delete('/:id', TeamCtrl.delTeam);

module.exports = router;

