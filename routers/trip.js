const router = require('express').Router();
const TripController = require('../controllers/trip');

router.post('/', TripController.postTrip);
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'ok'
  })
});

module.exports = router;
