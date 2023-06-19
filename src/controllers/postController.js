const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await postService.createPost(req.body, id);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const getAllPosts = async (req, res) => {
  const { type, message } = await postService.getAllPosts();
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const getById = async (req, res) => {
  const { type, message } = await postService.getById(req.params.id);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const updatePost = async (req, res) => {
  const { id } = req.user;

  const { type, message } = await postService.updatePost(req.params.id, req.body, id);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await postService.deletePost(+req.params.id, id);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).end();
};

const searchPost = async (req, res) => {
  const { type, message } = await postService.searchPost(req.query.q);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
  searchPost,
};