const { Category } = require('../models');
// const { tokenGenerator } = require('../utils/tokenJWT');

const createCategory = async (newCategory) => {
  const result = await Category.create(newCategory);
  // if (isNewRecord) {
  //   return { type: 409, message: 'Category already exists' };
  // }
  // const { name } = newCategory;
  // const { id, dataValues } = await Category.findOne({ where: { name } });

    // tokenGenerator({ id });

  return { type: 201, message: result };
};

module.exports = {
  createCategory,
};
