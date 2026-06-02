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

  async login(req, res) {
    try {
     
      const result = await AuthService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal server error';

      if (error.message === 'Invalid credentials') {
        statusCode = 401;
        message = error.message;
      }

      res.status(statusCode).json({
        success: false,
        message,
      });
    }
  }

  async getMe(req, res) {
    try {
      const user = await AuthService.getUserById(req.user.userId);

      res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        data: user,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal server error';

      if (error.message === 'User not found') {
        statusCode = 404;
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
