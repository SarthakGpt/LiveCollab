// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const { loginvalidation, signupvalidation } = require('../middlewares/AuthValidation.js');
const { signup, login } = require('../controllers/AuthController.js');

router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);

module.exports = router;