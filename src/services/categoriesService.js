const { Category } = require('../models');
const { HTTP_STATUS } = require('../utils/httpStatus');

const createCategory = async (newCategory) => {
  const result = await Category.create(newCategory);
  return { type: HTTP_STATUS.CREATED, message: result };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { type: HTTP_STATUS.OK, message: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};
