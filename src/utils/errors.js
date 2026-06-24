class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
  }
}

class BadRequestError extends ApiError {
  constructor(message, errors = []) {
    super(400, message, errors);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message) {
    super(401, message);
  }
}

class ForbiddenError extends ApiError {
  constructor(message) {
    super(403, message);
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message);
  }
}

class ConflictError extends ApiError {
  constructor(message) {
    super(409, message);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
