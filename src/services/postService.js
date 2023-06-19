const { Op } = require('sequelize');
const { Category } = require('../models');
const { BlogPost } = require('../models');
const { PostCategory } = require('../models');
const { User } = require('../models');
const { HTTP_STATUS } = require('../utils/httpStatus');

const validateCategoryIds = async (categoryIds) => {
   const result = await Category.findAll({
    where: { id: categoryIds },
  });
   const validateCategoryId = result.map((item) => item.dataValues.id);
   return categoryIds.length === validateCategoryId.length;
};

const combinePostData = async (post) => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  const categories = await Category.findAll();
  return {
    ...post.dataValues,
    user: users.find((user) => user.id === post.userId),
    categories: categories.filter((category) => category.id === post.id),
  };
};

const createPost = async ({ title, content, categoryIds }, userId) => {
  const isValidCategoryIds = await validateCategoryIds(categoryIds);
  if (!isValidCategoryIds) {
    return { type: HTTP_STATUS.BAD_REQUEST, message: 'one or more "categoryIds" not found' };
  }
  const newPost = await BlogPost.create({ title, content, userId });

  const categoryCreate = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));
  await PostCategory.bulkCreate(categoryCreate);
  return { type: HTTP_STATUS.CREATED, message: newPost };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll();
  if (!posts) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Post does not exist' };
  }
  const combinedData = await Promise.all(posts.map(combinePostData));
 
  return { type: HTTP_STATUS.OK, message: combinedData };
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Post does not exist' };
  }
  const combinedData = await combinePostData(post);
  return { type: HTTP_STATUS.OK, message: combinedData };
};

const updatePost = async (id, { title, content }, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Post does not exist' };
  }
  if (post.userId !== userId) {
    return { type: HTTP_STATUS.UNAUTHORIZED, message: 'Unauthorized user' };
  }
  await post.update({ title, content });
  const combinedData = await combinePostData(post);
  return { type: HTTP_STATUS.OK, message: combinedData };
};

const deletePost = async (id, userId) => {
  try {
    const post = await BlogPost.findOne({ where: { id } });
    if (!post) {
      return { type: HTTP_STATUS.NOT_FOUND, message: 'Post does not exist' };
    }
    if (post.userId !== userId) {
      return { type: HTTP_STATUS.UNAUTHORIZED, message: 'Unauthorized user' };
    }
    await PostCategory.destroy({ where: { postId: id } });
    await post.destroy();
    return { type: HTTP_STATUS.NO_CONTENT };
  } catch (error) {
    return { type: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const searchPost = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ] },
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
      return { type: HTTP_STATUS.OK, message: posts };
    };
    
module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
  searchPost,
};