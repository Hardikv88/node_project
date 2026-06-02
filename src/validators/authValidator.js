const validateRegister = (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;
  const errors = [];

  if (!userName || userName.trim() === '') {
    errors.push('userName is required');
  }

  if (!userEmail || userEmail.trim() === '') {
    errors.push('userEmail is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      errors.push('Invalid email format');
    }
  }

  if (!userPassword) {
    errors.push('userPassword is required');
  } else if (userPassword.length < 8) {
    errors.push('userPassword must be at least 8 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  const errors = [];

  if (!userEmail || userEmail.trim() === '') {
    errors.push('userEmail is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      errors.push('Invalid email format');
    }
  }

  if (!userPassword) {
    errors.push('userPassword is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
