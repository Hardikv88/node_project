const PostService = require('../services/PostService');

class PostController {
  async createPost(req, res, next) {
    try {
      const { title, body } = req.body;
      
      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Title is required',
        });
      }
      
      if (!body || body.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Body is required',
        });
      }
      
      const post = await PostService.createPost(req.body, req.user.id);
      
      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const page = Math.max(1, parseInt(req.query.page || '1', 10));
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '10', 10)));
      
      const { count, rows } = await PostService.getAllPosts(page, limit);
      
      const totalPages = Math.ceil(count / limit);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;
      
      res.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        data: rows,
        meta: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: count,
          totalPages: totalPages,
          hasNextPage: hasNext,
          hasPreviousPage: hasPrevious,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const postId = req.params.id || req.query.id || req.body.postId;    
      if (!postId) {    
        return res.status(400).json({    
          success: false,    
          message: 'Post ID is required',    
        });    
      }    
      
      const post = await PostService.getPostById(postId);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Post retrieved successfully',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
