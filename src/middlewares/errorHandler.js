const { ApiError } = require('../utils/errors');
const { ValidationError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let error = {
    success: false,
    message: 'Internal Server Error',
    errors: [],
  };

  let statusCode = 500;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    error.message = err.message;
    error.errors = err.errors;
  } else if (err instanceof ValidationError) {
    statusCode = 400;
    error.message = 'Validation failed';
    error.errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    error.message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    error.message = 'Token expired';
  } else if (err.name === 'MulterError') {
    statusCode = 400;
    error.message = err.message;
  }

  res.status(statusCode).json(error);
};

module.exports = errorHandler;
