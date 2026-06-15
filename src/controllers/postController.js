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
      const page = parseInt(req.body.page, 10) || 1;
      const limit = parseInt(req.body.limit, 10) || 10;
      
      const { count, rows } = await PostService.getAllPosts(page, limit);
      
      const totalPages = Math.ceil(count / limit);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;
      
      res.status(200).json({
        success: true,
        data: rows,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: count,
          totalPages: totalPages,
          hasNextPage: hasNext,
          hasPreviousPage: hasPrevious,
        },
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
