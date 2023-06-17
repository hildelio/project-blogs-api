const { Router } = require('express');
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation');
const tokenValidation = require('../middlewares/tokenValidation');
const postIdValidation = require('../middlewares/postIdValidation');

const postRouter = Router();

postRouter.post('/', postValidation, tokenValidation, postController.createPost);

postRouter.get('/', tokenValidation, postController.getAllPosts);

postRouter.get('/:id', tokenValidation, postController.getById);

postRouter.put('/:id/', postIdValidation, tokenValidation, postController.updatePost);

module.exports = postRouter;