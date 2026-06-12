const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
  }, {
    tableName: 'posts', 
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Post;
};
