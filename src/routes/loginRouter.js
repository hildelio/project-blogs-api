const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginValidation');

const loginRouter = Router();

loginRouter.post('/', loginValidation, loginController.loginAuth);

module.exports = loginRouter;