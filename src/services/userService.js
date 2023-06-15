const { User } = require('../models');
const { tokenGenerator } = require('../utils/tokenJWT');

const registerUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      return { type: 409, message: 'User already registered' }; // 409: Conflict
    }
    await User.create({
      displayName,
      email,
      password,
      image,
    });
    
    const token = tokenGenerator(user.dataValues);

    return { type: 201, token }; // 201: Created
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

module.exports = {
  registerUser,
  getAllUsers,
};