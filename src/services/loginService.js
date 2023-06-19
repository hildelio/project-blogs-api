const { User } = require('../models');
const { HTTP_STATUS } = require('../utils/httpStatus');
const { tokenGenerator } = require('../utils/tokenJWT');

const loginAuth = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return { type: HTTP_STATUS.BAD_REQUEST, message: 'Invalid fields' };
      }
    const { id } = user;
    const token = tokenGenerator({ id });

    return { type: HTTP_STATUS.OK, token };
};

module.exports = {
  loginAuth,
};