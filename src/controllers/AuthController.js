const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await AuthService.registerUser(req.body, req.file);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await AuthService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await AuthService.getUserById(req.user.id);

      res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await AuthService.updateUser(req.user.id, req.body, req.file);

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
