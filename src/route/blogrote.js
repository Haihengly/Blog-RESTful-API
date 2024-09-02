const Router = require('express');
const blogRouter = Router();
const {validateToken} = require('../utils/jwtValidate');
const { uploadBlog } = require('../utils/imageHandlerBlog');
const {createNewBlogController , getAllBlogController , editBlogController, deleteBlogController} = require('../controller/blogcontroller')

blogRouter.use(validateToken);
blogRouter.post('/createNewBlog', uploadBlog.single('filename'),createNewBlogController);
blogRouter.get('/getAllBlog', getAllBlogController);
blogRouter.put('/editBlog/:id', uploadBlog.single('filename'),editBlogController);
blogRouter.delete('/deleteBlog/:id', deleteBlogController);


module.exports.blogRouter = blogRouter;