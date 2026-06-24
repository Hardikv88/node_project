const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      field: 'id',
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
      type: DataTypes.ENUM('super_admin', 'admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
      field: 'user_role',
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'gender',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'city',
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'address',
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_image',
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'created_by',
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'updated_by',
    },
    deletedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'deleted_by',
    },
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        user.userPassword = await bcrypt.hash(user.userPassword, saltRounds);
      },
    },
  });

  User.associate = function(models) {
    User.hasMany(models.Quote, {
      foreignKey: 'userId',
      as: 'quotes',
    });
  };

  return User;
};
