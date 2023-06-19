const { Sequelize } = require('sequelize');
const { Category } = require('../models');
const { BlogPost } = require('../models');
const { PostCategory } = require('../models');
const { User } = require('../models');

const createPost = async ({ title, content, categoryIds }, userId) => {
  const result = await Category.findAll({
    where: { id: categoryIds },
  });
  const validateCategoryId = result.map((item) => item.dataValues.id);
  if (categoryIds.length !== validateCategoryId.length) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
  // if (result || result !== null || result !== undefined) {
  //   return { type: 409, message: 'Post already registered' }; // 409: Conflict
  // }
  const newPost = await BlogPost.create({ title, content, userId });

  const categoryCreate = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));
  await PostCategory.bulkCreate(categoryCreate);
  return { type: 201, message: newPost };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll();
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  const categories = await Category.findAll();
  const combinedData = posts.map((post) => ({
    ...post.dataValues,
    user: users.find((user) => user.id === post.userId),
    categories: categories.filter((category) => category.id === post.id),
  }));  
  return { type: 200, message: combinedData };
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id } });
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  const categories = await Category.findAll();
  if (post === null) {
    return { type: 404, message: 'Post does not exist' };
  }
  const combinedData = {
    ...post.dataValues,
    user: users.find((user) => user.id === post.userId),
    categories: categories.filter((category) => category.id === post.id),
  };
  return { type: 200, message: combinedData };
};

const updatePost = async (id, { title, content }, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (post === null) {
    return { type: 404, message: 'Post does not exist' };
  }
  if (post.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await post.update({ title, content });
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  const categories = await Category.findAll();
  const combinedData = {
    ...post.dataValues,
    user: users.find((user) => user.id === post.userId),
    categories: categories.filter((category) => category.id === post.id),
  };
  return { type: 200, message: combinedData };
};

const deletePost = async (id, userId) => {
  try {
    const post = await BlogPost.findOne({ where: { id } });
    if (post === null) {
      return { type: 404, message: 'Post does not exist' };
    }
    if (post.userId !== userId) {
      return { type: 401, message: 'Unauthorized user' };
    }
    await PostCategory.destroy({ where: { postId: id } });
    await post.destroy();
    return { type: 204 };
  } catch (error) {
    return { type: 500, message: error.message };
  }
};

const searchPost = async (query) => {
  const posts = await BlogPost.findAll(
    { where: { [Sequelize.Op.or]: [
    { title: { [Sequelize.Op.like]: `%${query}%` } },
    { content: { [Sequelize.Op.like]: `%${query}%` } },
  ] },
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] },
);
  return { type: 200, message: posts };
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
  searchPost,
};