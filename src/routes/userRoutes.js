const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, userController.getAllUsers);
router.post('/create', userController.createUser);

module.exports = router;
