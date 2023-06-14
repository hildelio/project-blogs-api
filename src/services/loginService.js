const jwt = require('jsonwebtoken');
const { User } = require('../models');

const loginAuth = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user === null
      || user.password !== password) {
      return { type: 400, message: 'Invalid fields' }; // 401: Unauthorized
    }
    const secret = process.env.JWT_SECRET;
    
    const token = jwt.sign(password, secret);
    return { type: 200, token }; // 200: OK
};

module.exports = {
  loginAuth,
};