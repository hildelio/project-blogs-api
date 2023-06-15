const { decodedToken } = require('../utils/tokenJWT');
const { tokenSchema } = require('./joiSchema');

function tokenValidation(req, res, next) {
  const { authorization: token } = req.headers;
  const { error } = tokenSchema.validate(token);
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  try {
    const decoded = decodedToken(token);    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = tokenValidation;