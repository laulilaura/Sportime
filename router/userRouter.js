const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

router.post('/', UserCtrl.createUser);
router.get('/', UserCtrl.getAllUsers);
router.get('/:username', UserCtrl.getOneUserByUsername);
router.get('/usersByTeam/:idTeam', UserCtrl.getUsersByTeam);

module.exports = router;
