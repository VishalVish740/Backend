const express = require('express');
const { signupUser, loginUser, forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;