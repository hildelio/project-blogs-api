const userService = require('../services/userService');

const registerUser = async (req, res) => {
  const { type, message, token } = await userService.registerUser(req.body);
  if (type > 300) {
    return res.status(type).json({ message }); 
  }
  return res.status(type).json({ token });  
};

const getAllUsers = async (__req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  const { type, message } = user;
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

module.exports = {
  registerUser,
  getAllUsers,
  getById,
};