const PostService = require('../services/PostService');

class PostController {
  async createPost(req, res) {
    try {
      console.log('Creating post with data:', req.body);
      console.log('User ID from token:', req.user?.userId);
      
      if (!req.user?.userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }
      
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
      
      const post = await PostService.createPost(req.body, req.user.userId);
      
      console.log('Post created successfully:', post);
      
      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
        success: false,
        message: error.message,
        details: error.stack,
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

  async getPostById(req, res) {
    try {
      const postId = req.body.postId;    
      if (!postId) {    
        return res.status(400).json({    
          success: false,    
          message: 'postId is required',    
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
        data: post,
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
