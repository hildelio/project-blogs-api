const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),    
}).messages({ 
  'string.empty': 'Some required fields are missing',
  'any.required': 'Some required fields are missing',
});

module.exports = { loginSchema };