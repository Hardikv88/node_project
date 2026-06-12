const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Add authentication to getAllPosts API',
  prompt: 'Require Authorization bearer token for getAllPosts API.',
  responseSummary: 'Updated postRoutes.js to add authenticateToken middleware to getAllPosts route.',
  status: 'Success'
});
