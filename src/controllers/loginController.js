const loginService = require('../services/loginService');

const loginAuth = async (req, res) => {
  const { type, message, token } = await loginService.loginAuth(req.body);
  if (type > 300) {
    return res.status(type).json({ message }); 
  }
  return res.status(type).json({ token });
};

module.exports = {
  loginAuth,
};