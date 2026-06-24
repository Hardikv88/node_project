const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Quote = sequelize.define('Quote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      field: 'id',
    },
    quotes: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'quotes',
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'author',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
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
    tableName: 'quotes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });

  Quote.associate = function(models) {
    Quote.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Quote;
};
