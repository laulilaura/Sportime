const express = require('express');
const router = express.Router();
const PratiqueCtrl = require('../controllers/pratiqueController');

router.post('/', PratiqueCtrl.createPratique);

router.get('/', PratiqueCtrl.getAllPratique);
router.get('/id/:id', PratiqueCtrl.getOnePratiqueById);
router.get('/userId/:userId', PratiqueCtrl.getPratiquesByUserid);
router.get('/usersBySport/:idSport', PratiqueCtrl.getPratiquesBySport);
router.get('/niveau/:niveau', PratiqueCtrl.getPratiquesByNiveau);

router.put('/:id', PratiqueCtrl.putPratique);

router.delete('/:id', PratiqueCtrl.delPratique);

module.exports = router;
