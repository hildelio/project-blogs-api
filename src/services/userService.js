const { User } = require('../models');
const { HTTP_STATUS } = require('../utils/httpStatus');

const { tokenGenerator } = require('../utils/tokenJWT');

const registerUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      return { type: HTTP_STATUS.CONFLICT, message: 'User already registered' };
    }
    const { id } = await User.create({
      displayName,
      email,
      password,
      image,
    });
    
    const token = tokenGenerator({ id });

    return { type: HTTP_STATUS.CREATED, token };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { type: HTTP_STATUS.OK, message: users };
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  if (!user) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'User does not exist' };
  }
  return { type: HTTP_STATUS.OK, message: user };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { type: HTTP_STATUS.NO_CONTENT };
};

module.exports = {
  registerUser,
  getAllUsers,
  getById,
  deleteUser,
};