const { Router } = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');

const userRouter = Router();

userRouter.post('/', userValidation, userController.registerUser);

module.exports = userRouter;