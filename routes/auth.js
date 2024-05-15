const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerUser');
const { loginUser } = require('../controllers/loginUser');
const { logoutUser } = require('../controllers/logoutUser');
const { requestPasswordReset } = require('../controllers/requestPasswordReset');
const { resetPassword } = require('../controllers/resetPassword');

router.post('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);

module.exports = router;
