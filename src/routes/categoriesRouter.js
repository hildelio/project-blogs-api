const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const { categoriesValidation, tokenValidation } = require('../middlewares');

const categoriesRouter = Router();

categoriesRouter.post(
  '/', 
categoriesValidation,
tokenValidation,
categoriesController.createCategory,
);

categoriesRouter.get('/', tokenValidation, categoriesController.getAllCategories);

module.exports = categoriesRouter;