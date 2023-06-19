const loginService = require('../services/loginService');
const { handleResponseWithToken } = require('../utils/handleResponse');

const loginAuth = async (req, res) => {
  const response = await loginService.loginAuth(req.body);
  return handleResponseWithToken(res, response);
};

module.exports = {
  loginAuth,
};