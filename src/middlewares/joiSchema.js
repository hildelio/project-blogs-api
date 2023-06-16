const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),    
}).messages({ 
  'string.empty': 'Some required fields are missing',
  'any.required': 'Some required fields are missing',
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),    
});

const tokenSchema = Joi.string().required().messages({
  'string.empty': 'Token not found',
  'any.required': 'Token not found', 
});

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { loginSchema, userSchema, tokenSchema, categoriesSchema };