const { User } = require('../models');
const { tokenGenerator } = require('../utils/tokenJWT');

const loginAuth = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user === null
      || user.password !== password) {
        return { type: 400, message: 'Invalid fields' }; // 401: Unauthorized
      }
    const { id } = user;
    const token = tokenGenerator(id);

    return { type: 200, token }; // 200: OK
};

module.exports = {
  loginAuth,
};