const Router = require('express');
const userRouter = Router();
const {validateToken} = require('../utils/jwtValidate');
const { upload } = require('../utils/image_handler');
const {getUserController , editUserController} = require('../controller/usercontroller');

userRouter.use(validateToken);
userRouter.get('/getUser', getUserController);
userRouter.put('/editUser', upload.single('filename'),editUserController);

module.exports.userRouter = userRouter;