const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

router.post('/', UserCtrl.createUser);
router.get('/', UserCtrl.getAllUsers);
router.get('/id/:id', UserCtrl.getOneUserById);
router.get('/username/:username', UserCtrl.getOneUserByUsername);
router.get('/usersByTeam/:idTeam', UserCtrl.getUsersByTeam);
router.get('/villeFav/:ville_fav', UserCtrl.getUsersByVilleFav);

module.exports = router;
