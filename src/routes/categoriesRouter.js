const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const categoriesValidation = require('../middlewares/categoriesValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const categoriesRouter = Router();

categoriesRouter.post(
  '/', 
categoriesValidation,
tokenValidation,
categoriesController.createCategory,
);

categoriesRouter.get('/', tokenValidation, categoriesController.getAllCategories);

module.exports = categoriesRouter;