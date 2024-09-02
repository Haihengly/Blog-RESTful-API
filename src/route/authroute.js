const { userLoginController } = require('../controller/authcontroller');
const { userRegisterController } = require('../controller/authcontroller'); 
const Router = require('express');
const { upload } = require('../utils/image_handler');
const authRouter = Router();

authRouter.post('/register', upload.single('filename'), userRegisterController);
authRouter.post('/login', userLoginController);

module.exports.authRouter = authRouter;