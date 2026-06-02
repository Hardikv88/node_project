const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validateRegister } = require('../validators/authValidator');

router.post('/register', validateRegister, AuthController.register);

module.exports = router;
