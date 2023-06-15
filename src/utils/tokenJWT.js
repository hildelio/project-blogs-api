const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'you-shall-not-pass';

// const jwtConfig = { expiresIn: '1y', algorithm: 'HS256' };

const tokenGenerator = (payload) => jwt.sign(payload, SECRET);

const decodedToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  tokenGenerator,
  decodedToken,
};