const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Implement S3 profile image upload and multipart/form-data support',
  prompt: 'Update User update API to support multipart/form-data and profile image upload to AWS S3. Change registration API to accept multipart/form-data.',
  responseSummary: 'Added S3 uploader utility, multer config, updated User model (profileImage), updated AuthService/AuthController/routes to handle file uploads and multipart/form-data.',
  status: 'Success'
});
