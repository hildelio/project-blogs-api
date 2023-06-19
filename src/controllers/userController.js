const userService = require('../services/userService');
const { handleResponseWithToken, handleResponse } = require('../utils/handleResponse');

const registerUser = async (req, res) => {
  const response = await userService.registerUser(req.body);
  return handleResponseWithToken(res, response);
};

const getAllUsers = async (__req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getById(id);
  return handleResponse(res, response);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await userService.deleteUser(id);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).end();
};

module.exports = {
  registerUser,
  getAllUsers,
  getById,
  deleteUser,
};