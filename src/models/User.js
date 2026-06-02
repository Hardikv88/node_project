const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id',
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_name',
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'user_email',
      validate: {
        isEmail: true,
      },
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_password',
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'User',
      field: 'user_role',
    },
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        user.userPassword = await bcrypt.hash(user.userPassword, saltRounds);
      },
    },
  });

  return User;
};
