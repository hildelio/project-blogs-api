const categoriesValidation = require('./categoriesValidation');
const loginValidation = require('./loginValidation');
const postIdValidation = require('./postIdValidation');
const postValidation = require('./postValidation');
const tokenValidation = require('./tokenValidation');
const userValidation = require('./userValidation');

const middlewares = {
  categoriesValidation,
  loginValidation,
  postIdValidation,
  postValidation,
  tokenValidation,
  userValidation,
};

module.exports = middlewares;
