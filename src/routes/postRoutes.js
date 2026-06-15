const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/create', authenticateToken, postController.createPost);
router.post('/', authenticateToken, postController.getAllPosts);

module.exports = router;
