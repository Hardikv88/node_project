const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Create comprehensive RULES.md file',
  prompt: 'Create a RULES.md file in the project root directory for a professional backend project...',
  responseSummary: 'Created RULES.md with all enterprise-level rules including architecture, coding standards, API response standards, security, etc.',
  status: 'Success'
});
