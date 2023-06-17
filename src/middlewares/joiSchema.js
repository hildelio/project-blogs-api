const Joi = require('joi');

const ERROR_MESSAGE_REQUIRED_FIELDS = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),    
}).messages({ 
  'string.empty': ERROR_MESSAGE_REQUIRED_FIELDS,
  'any.required': ERROR_MESSAGE_REQUIRED_FIELDS,
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

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
}).messages({
  'string.empty': ERROR_MESSAGE_REQUIRED_FIELDS,
  'any.required': ERROR_MESSAGE_REQUIRED_FIELDS,
});

const postIdSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).messages({
  'number.empty': ERROR_MESSAGE_REQUIRED_FIELDS,
  'string.empty': ERROR_MESSAGE_REQUIRED_FIELDS,
  'any.required': ERROR_MESSAGE_REQUIRED_FIELDS,
});

module.exports = {
  loginSchema, userSchema, tokenSchema, categoriesSchema, postSchema, postIdSchema,
};