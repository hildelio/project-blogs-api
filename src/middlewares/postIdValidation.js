const { postIdSchema } = require('./joiSchema');

const postIdValidation = (req, res, next) => {
  const { title, content } = req.body;
  const { error } = postIdSchema.validate({ title, content });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = postIdValidation;