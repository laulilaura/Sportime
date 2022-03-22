const express = require('express');
const router = express.Router();
const SpotCtrl = require('../controllers/spotController');

router.post('/', SpotCtrl.createSpot);
router.get('/', SpotCtrl.getAllSpot);
router.get('/id/:id', SpotCtrl.getOneSpotById);
router.get('/nom/:nomSpot', SpotCtrl.getOneSpotByName);
router.get('/ville/:nomVille', SpotCtrl.getSpotsByVille);

router.put('/:id', SpotCtrl.putSpot);

router.delete('/:id', SpotCtrl.delSpot);

module.exports = router;