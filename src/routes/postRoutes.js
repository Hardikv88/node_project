const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, postController.createPost);
router.get('/', authenticateToken, postController.getAllPosts);

module.exports = router;
