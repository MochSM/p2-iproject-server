const router = require('express').Router();
const TripController = require('../controllers/trip');

router.post('/', TripController.postTrip);
router.get('/', TripController.getTrips);
router.patch('/:id', TripController.updateTrip);

module.exports = router;
