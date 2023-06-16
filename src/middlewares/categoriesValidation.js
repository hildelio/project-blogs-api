const { categoriesSchema } = require('./joiSchema');

const categoriesValidation = (req, res, next) => {
  const { error } = categoriesSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next(); 
};

module.exports = categoriesValidation;