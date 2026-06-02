const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const user = await AuthService.registerUser(req.body);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal server error';

      if (error.message === 'Email already registered') {
        statusCode = 409;
        message = error.message;
      }

      res.status(statusCode).json({
        success: false,
        message,
      });
    }
  }
}

module.exports = new AuthController();
