const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Fix server startup issue after database update',
  prompt: 'Fix sequelize sync alter: true causing foreign key errors',
  responseSummary: 'Recreated drop-all-tables.js script, added db:drop to package.json, removed { alter: true } from sequelize.sync() in server.js, dropped all tables, recreated them with UUID structure successfully! Server is running on port 3000!',
  status: 'Success'
});
