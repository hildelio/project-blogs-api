const { Router } = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const userRouter = Router();

userRouter.post('/', userValidation, userController.registerUser);

userRouter.get('/', tokenValidation, userController.getAllUsers);

module.exports = userRouter;