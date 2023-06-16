'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });
  blogPostTable.associate = (models) => {
    blogPostTable.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
  
  return blogPostTable;
};