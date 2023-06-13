'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts_categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  posts_categorie.init({
    category_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post_categorie',
    underscored: true,
  });
  return posts_categorie;
};