'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  blog_post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blog_post',
    underscored: true,
  });
  return blog_post;
};