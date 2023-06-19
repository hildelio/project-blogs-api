const userService = require('../services/userService');
const {
  handleResponseWithToken,
  handleResponse,
  handleResponseWithoutMessage,
} = require('../utils/handleResponse');

const registerUser = async (req, res) => {
  const response = await userService.registerUser(req.body);
  return handleResponseWithToken(res, response);
};

const getAllUsers = async (__req, res) => {
  const response = await userService.getAllUsers();
  return handleResponse(res, response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getById(id);
  return handleResponse(res, response);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const response = await userService.deleteUser(id);
  return handleResponseWithoutMessage(res, response);
};

module.exports = {
  registerUser,
  getAllUsers,
  getById,
  deleteUser,
};