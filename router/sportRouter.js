const express = require('express');
const router = express.Router();
const SportCtrl = require('../controllers/sportController');

router.post('/', SportCtrl.createSport);

module.exports = router;