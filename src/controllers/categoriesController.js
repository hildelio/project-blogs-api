const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const { type, message } = await categoriesService.createCategory(req.body);
  if (type > 300) {
    return res.status(type).json({ message }); 
  }
  return res.status(type).json(message);
};
module.exports = {
  createCategory,
};