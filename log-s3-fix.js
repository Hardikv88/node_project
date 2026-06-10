const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Fix profileImage upload errors',
  prompt: 'Fix errors when passing profileImage to update API',
  responseSummary: 'Added error handling in s3Uploader.js, made S3 upload optional if credentials not set, updated AuthService to handle null from uploadToS3',
  status: 'Success'
});
