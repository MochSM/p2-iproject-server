const router = require('express').Router();
const AuthController = require('../controllers/auth');

router.post('/google-signin', AuthController.googleLogin);

module.exports = router;
