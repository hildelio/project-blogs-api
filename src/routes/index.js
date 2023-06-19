const categoriesRouter = require('./categoriesRouter');
const loginRouter = require('./loginRouter');
const postRouter = require('./postRouter');
const userRouter = require('./userRouter');

const routes = {
  loginRouter,
  userRouter,
  categoriesRouter,
  postRouter,
};
module.exports = routes;