const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Create get post detail by ID API',
  prompt: 'postController to particular post id thrue get post detials on posts table so create Apis only posts id get post details Post method',
  responseSummary: 'Created POST /api/posts/detail API with authentication. Added getPostById controller method that validates postId, calls existing PostService.getPostById, includes user data (without password), and returns appropriate error responses (400 for missing postId, 404 for post not found).',
  status: 'Success'
});
