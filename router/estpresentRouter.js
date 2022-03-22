const express = require('express');
const router = express.Router();
const EstPresentCtrl = require('../controllers/estpresentController');

router.post('/', EstPresentCtrl.createPresence);

router.get('/', EstPresentCtrl.getAllPresences);
router.get('/sport/:idSport', EstPresentCtrl.getPresenceBySport);
router.get('/spot/:idSpot', EstPresentCtrl.getPresenceBySpot);
router.get('/user/:idUser', EstPresentCtrl.getPresenceByUser);
router.get('/date/:date', EstPresentCtrl.getPresenceByDate);

router.put('/:id', EstPresentCtrl.putPresence);

router.delete('/:id', EstPresentCtrl.delPresence);

module.exports = router;
