const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Fix getAllUsers route to use GET method',
  prompt: 'Fix route method for getAllUsers API',
  responseSummary: 'Corrected userRoutes.js to use router.get instead of router.post for getAllUsers.',
  status: 'Success'
});
