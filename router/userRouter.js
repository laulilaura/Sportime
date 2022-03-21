const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

router.post('/', UserCtrl.createUser);
router.get('/:username', UserCtrl.getOneUserByUsername);
router.get('/', UserCtrl.getAllUsers);

module.exports = router;
