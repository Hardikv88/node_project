const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Revert register route to original',
  prompt: 'Revert register API to original, only update API has file upload',
  responseSummary: 'Reverted authRoutes.js register route to use only validateRegister, kept file upload only for update',
  status: 'Success'
});
