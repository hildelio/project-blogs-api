const { Router } = require('express');
const postController = require('../controllers/postController');
const { postValidation, tokenValidation, postIdValidation } = require('../middlewares');

const postRouter = Router();

postRouter.post('/', postValidation, tokenValidation, postController.createPost);

postRouter.get('/search', tokenValidation, postController.searchPost);

postRouter.get('/', tokenValidation, postController.getAllPosts);

postRouter.get('/:id', tokenValidation, postController.getById);

postRouter.put('/:id/', postIdValidation, tokenValidation, postController.updatePost);

postRouter.delete('/:id', tokenValidation, postController.deletePost);

module.exports = postRouter;