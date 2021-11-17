const router = require('express').Router();
const authRouter = require('./auth');
const tripRouter = require('./trip');

router.use('/auth', authRouter);

// router.use(authentication);
router.use('/trip', tripRouter);

// router.use(errorHandler);

module.exports = router;
