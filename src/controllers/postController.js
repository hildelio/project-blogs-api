const postService = require('../services/postService');
const { handleResponse } = require('../utils/handleResponse');

const createPost = async (req, res) => {
  const { id } = req.user;
  const response = await postService.createPost(req.body, id);
  return handleResponse(res, response);
};

const getAllPosts = async (req, res) => {
  const response = await postService.getAllPosts();
  return handleResponse(res, response);
};

const getById = async (req, res) => {
  const response = await postService.getById(req.params.id);
  return handleResponse(res, response);
};

const updatePost = async (req, res) => {
  const { id } = req.user;
  const response = await postService.updatePost(req.params.id, req.body, id);
  return handleResponse(res, response);
};

const deletePost = async (req, res) => {
  const { id } = req.user;
  const response = await postService.deletePost(+req.params.id, id);
  return handleResponse(res, response);
};

const searchPost = async (req, res) => {
  const response = await postService.searchPost(req.query.q);
  return handleResponse(res, response);
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
  searchPost,
};