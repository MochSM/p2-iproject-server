const router = require('express').Router();
const PaymentController = require('../controllers/payment');

router.post('/:id', PaymentController.makePayment);

module.exports = router;
