const router = require('express').Router();
const authRouter = require('./auth');
const tripRouter = require('./trip');
const paymentRouter = require('./payment');
const { authentication } = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');

router.use('/auth', authRouter);

router.use(authentication);

router.use('/trip', tripRouter);
router.use('/payment', paymentRouter);

router.use(errorHandler);

module.exports = router;
