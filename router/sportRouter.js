const express = require('express');
const router = express.Router();
const SportCtrl = require('../controllers/sportController');

router.post('/', SportCtrl.createSport);
router.get('/', SportCtrl.getAllSports);
router.get('/:idSport', SportCtrl.getOneSportById);

module.exports = router;