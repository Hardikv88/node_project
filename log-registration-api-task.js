const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Create User model and Registration API',
  prompt: 'Create a User model and Registration API using Node.js, Express.js, PostgreSQL, and Sequelize ORM...',
  responseSummary: 'Created complete User model and Registration API following Route → Controller → Service → Model architecture with validation, password hashing, and proper error handling',
  status: 'Success'
});
