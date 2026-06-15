const { Post, User } = require('../models');

class PostService {
  async createPost(postData, userId) {
    const post = await Post.create({
      ...postData,
      userId: userId,
    });
    return post;
  }

  async getAllPosts(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Post.findAndCountAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['userPassword'] },
        },
      ],
      order: [['created_at', 'DESC']],
      limit: limit,
      offset: offset,
    });
    
    return { count, rows };
  }

  async getPostById(postId) {
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['userPassword'] },
        },
      ],
    });
    return post;
  }
}

module.exports = new PostService();
