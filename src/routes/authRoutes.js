const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validateRegister, validateLogin, validateUpdateUser } = require('../validators/authValidator');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/me', authenticateToken, AuthController.getMe);
router.put('/update', authenticateToken, validateUpdateUser, AuthController.updateUser);

module.exports = router;
