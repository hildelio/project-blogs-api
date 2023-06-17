const { Router } = require('express');
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const postRouter = Router();

postRouter.post('/', postValidation, tokenValidation, postController.createPost);

module.exports = postRouter;