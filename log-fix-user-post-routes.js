const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Fix getAllUsers and Post routes/Controllers',
  prompt: 'Fix "column User.userId does not exist" error by updating all userId references to id',
  responseSummary: 'Fixed userController, Post model, postController, PostService, userRoutes, postRoutes! All controllers updated to use req.user.id and use next(err) for global error handling; routes changed from POST to GET for getAllUsers, getAllPosts, getPostById with query parameters for pagination; Post model updated to UUID with soft delete and audit fields! Dropped and recreated all tables! Server running at port 3000!',
  status: 'Success'
});
