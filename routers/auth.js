const router = require('express').Router();
const AuthController = require('../controllers/auth');

router.post('/google-signin', AuthController.googleLogin);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
