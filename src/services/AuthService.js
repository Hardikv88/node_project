const { User } = require('../models');

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
}

module.exports = new AuthService();
