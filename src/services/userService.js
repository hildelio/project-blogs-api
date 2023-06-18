const { User } = require('../models');

const { tokenGenerator } = require('../utils/tokenJWT');

const registerUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      return { type: 409, message: 'User already registered' }; // 409: Conflict
    }
    const { id } = await User.create({
      displayName,
      email,
      password,
      image,
    });
    
    const token = tokenGenerator({ id });

    return { type: 201, token }; // 201: Created
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  if (!user) {
    return { type: 404, message: 'User does not exist' };
  }
  return { type: 200, message: user };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { type: 204 };
};

module.exports = {
  registerUser,
  getAllUsers,
  getById,
  deleteUser,
};