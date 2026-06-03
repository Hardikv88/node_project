const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
  async registerUser(userData) {
    const { userName, userEmail, userPassword } = userData;

    const existingUser = await User.findOne({
      where: { userEmail },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = await User.create({
      userName,
      userEmail,
      userPassword,
    });

    const { userPassword: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async loginUser(loginData) {
    const { userEmail, userPassword } = loginData;

    const user = await User.findOne({
      where: { userEmail },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    const { userPassword: _, ...userWithoutPassword } = user.toJSON();

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async getUserById(userId) {
    const user = await User.findOne({
      where: { userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { userPassword: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async updateUser(userId, updateData) {
    const user = await User.findOne({
      where: { userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updateData);

    const { userPassword: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  generateToken(user) {
    const payload = {
      userId: user.userId,
      userRole: user.userRole,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
  }
}

module.exports = new AuthService();
