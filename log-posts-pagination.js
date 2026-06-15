const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Add pagination to getAllPosts API and change to POST method',
  prompt: 'GetAllPosts api add headers Authorization bearer token with call and change method post and implement pagination',
  responseSummary: 'Updated getAllPosts API: changed method from GET to POST, kept authenticateToken middleware, implemented pagination with page/limit from request body, updated PostService to use findAndCountAll, returned pagination metadata. Renamed createPost route to /create to avoid conflict.',
  status: 'Success'
});
