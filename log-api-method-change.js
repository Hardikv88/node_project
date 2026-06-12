const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Update getAllUsers API to use POST method',
  prompt: 'Change getAllUsers API to POST method and read page/limit from request body',
  responseSummary: 'Changed route to POST, updated controller to read page/limit from req.body, renamed createUser route to /create to avoid conflict.',
  status: 'Success'
});
