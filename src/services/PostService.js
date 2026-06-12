const { Post, User } = require('../models');

class PostService {
  async createPost(postData, userId) {
    const post = await Post.create({
      ...postData,
      userId: userId,
    });
    return post;
  }

  async getAllPosts() {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['userPassword'] },
        },
      ],
      order: [['created_at', 'DESC']],
    });
    return posts;
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
