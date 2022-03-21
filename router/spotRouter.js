const express = require('express');
const router = express.Router();
const SpotCtrl = require('../controllers/spotController');

router.post('/', SpotCtrl.createSpot);

module.exports = router;