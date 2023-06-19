const { Router } = require('express');
const userController = require('../controllers/userController');
const { userValidation, tokenValidation } = require('../middlewares');

const userRouter = Router();

userRouter.post('/', userValidation, userController.registerUser);

userRouter.get('/', tokenValidation, userController.getAllUsers);

userRouter.get('/:id', tokenValidation, userController.getById);

userRouter.delete('/me', tokenValidation, userController.deleteUser);

module.exports = userRouter;