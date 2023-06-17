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

module.exports = {
  createPost,
  getAllPosts,
};