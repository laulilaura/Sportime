const express = require('express');
const router = express.Router();
const SportCtrl = require('../controllers/sportController');

router.post('/', SportCtrl.createSport);

router.get('/', SportCtrl.getAllSports);
router.get('/:idSport', SportCtrl.getOneSportById);
router.get('/name/:name', SportCtrl.getOneSportByName);

router.put('/:id', SportCtrl.putSport);

router.delete('/:id', SportCtrl.delSport);

module.exports = router;