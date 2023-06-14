const jwt = require('jsonwebtoken');
const { User } = require('../models');

const registerUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (user !== null) {
      return { type: 409, message: 'User already registered' }; // 409: Conflict
    }
    await User.create({
      displayName,
      email,
      password,
      image,
    });
    const secret = process.env.JWT_SECRET;
    
    const token = jwt.sign(password, secret);

    return { type: 201, token }; // 201: Created
};

module.exports = {
  registerUser,
};