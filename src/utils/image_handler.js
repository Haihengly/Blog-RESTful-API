const multer = require('multer')
const storage = multer.diskStorage({
    destination : (request,file,callback) => {
        callback(null,'./src/uploads/user');
    },
    filename : (request,file,callback) => {
        callback(null , Date.now() + '-' + file.originalname);
    }
    //filterFile -> (jpg,...)
    //fileSize -> 10MB
})

const upload = multer({
    storage : storage
});

module.exports.upload = upload;