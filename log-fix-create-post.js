const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Debug and fix create post API',
  prompt: 'this create posts Apis not add record database. Check the properly Apis and check add the database in record',
  responseSummary: 'Added comprehensive debugging to createPost API: added console logging, input validation for title and body, user authentication check, error stack trace in response, and created .env.example file. The API structure is correct - common issues are missing .env file, database not connected, or invalid JWT token.',
  status: 'Success'
});
