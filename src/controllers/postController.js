const PostService = require('../services/PostService');

class PostController {
  async createPost(req, res) {
    try {
      const post = await PostService.createPost(req.body, req.user.userId);
      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json({
        success: true,
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new PostController();
