const {pool} = require('../DB/database');

const getUserController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const sql = `SELECT * FROM tb_user WHERE username = ?`;
    pool.query(sql , authenticatedUsername , (error,row) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        })
        response.status(200).json({
            message : "Get User Success",
            data    : row
        })
    })
}

const editUserController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const fileName              = request.file.filename;

    if(!authenticatedUsername) return response.status(500).json({
        message : "Unauthorized"
    })

    const sql = `UPDATE tb_user SET profile = ? WHERE username = ?`
    const updatedValue = [fileName , authenticatedUsername];
    pool.query(sql,updatedValue,(error,result) => {
        if(error) return response.status(500).json({
            message : "Something Went Wrong"
        })
        response.status(200).json({
            message : result
        })
    })
}

module.exports.editUserController = editUserController;
module.exports.getUserController = getUserController;