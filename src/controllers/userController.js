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
module.exports = {
  registerUser,
  getAllUsers,
};