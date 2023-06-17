'use strict';

module.exports = (sequelize, DataTypes) => {
  const postCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });
  postCategoryTable.associate = ({Category, BlogPost}) => {
    Category.belongsToMany(BlogPost, {
      foreignKey: 'categoryId',
      as: 'blogPosts',
      through: postCategoryTable,
      otherKey: 'postId'
    });
    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      as: 'categories',
      through: postCategoryTable,
      otherKey: 'categoryId'
    });
  }
  return postCategoryTable;
};