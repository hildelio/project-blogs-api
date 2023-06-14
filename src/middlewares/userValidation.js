const { userSchema } = require('./joiSchema');

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = userSchema.validate({ displayName, email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = userValidation;