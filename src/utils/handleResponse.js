const handleResponse = (res, { type, message }) => {
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const handleResponseWithToken = (res, { type, message, token }) => {
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json({ token });
};

module.exports = {
  handleResponse,
  handleResponseWithToken,
};