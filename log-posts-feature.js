const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Create Posts feature',
  prompt: 'Create posts table with columns (id, title, body, tags, reactions, views, userId), add relation with user table, create get and add posts APIs.',
  responseSummary: 'Created Post model with all required columns and relation to User model, created PostService, postController, postRoutes, added routes to main index.',
  status: 'Success'
});
