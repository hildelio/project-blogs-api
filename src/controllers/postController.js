const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await postService.createPost(req.body, id);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

module.exports = {
  createPost,
};