const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Add new user fields and update API',
  prompt: 'Add more columns to User model (gender, city, address, userProfileImage) and create update user API that updates user data without changing userId, userEmail, or userPassword',
  responseSummary: 'Updated User model with new optional fields, added validateUpdateUser middleware, implemented updateUser in AuthService and AuthController, and added PUT /api/auth/update endpoint',
  status: 'Success'
});
