const logHistory = require('./src/utils/historyLogger');

logHistory({
  agentName: 'Trae AI',
  taskTitle: 'Create complete CRUD module for quotes',
  prompt: 'Generate CRUD module for quotes with UUID primary key, soft delete, audit fields, pagination, search, sorting, JWT auth, RBAC, following enterprise architecture standards',
  responseSummary: 'Created complete enterprise-grade CRUD module including: User & Quote models with UUID, soft delete, audit fields; validation (Joi); repository layer; service layer with business logic & authorization; controller layer; routes with auth & validation; auth middleware with authorize(); error handling middleware; search/filter utilities; security (helmet, cors, rate limit); updated AuthService/AuthController for UUIDs',
  status: 'Success'
});
