const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Fix update API middleware and error handling',
  prompt: 'Fix Postman errors on update API',
  responseSummary: 'Fixed middleware order, added global error handler in app.js, moved Multer error handling there, cleaned up authValidator.js',
  status: 'Success'
});
