const { loginSchema } = require('./joiSchema');

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (!email || !password) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = loginValidation;