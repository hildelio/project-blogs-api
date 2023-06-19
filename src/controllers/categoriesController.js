const categoriesService = require('../services/categoriesService');
const { handleResponse } = require('../utils/handleResponse');

const createCategory = async (req, res) => {
  const response = await categoriesService.createCategory(req.body);
  return handleResponse(res, response);
};

const getAllCategories = async (req, res) => {
  const response = await categoriesService.getAllCategories();
  return handleResponse(res, response);
};

module.exports = {
  createCategory,
  getAllCategories,
};