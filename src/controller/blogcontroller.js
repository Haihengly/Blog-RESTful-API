const {pool} = require('../DB/database');

const createNewBlogController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const image = request.file;
    const { title,category,type,description,banner_image } = request.body;
    pool.query(`SELECT id FROM tb_user WHERE username = ?`,authenticatedUsername , (error,row) => {
        if(error) return response.status(500).json({
            message : "Something Went Wrong"
        })
        // console.log(row[0].id);
        if(!title && !type && !category && !description && !banner_image){
            return response.status(400).json({
                message : "Bad Request"
            })
        }
        const sql_insert = `INSERT INTO tb_blog (title,category,type,description,banner_image,user_id) VALUES (?,?,?,?,?,?)`;
        const insertValue = [title , category , type ,  description , image.filename , row[0].id]
        pool.query(sql_insert , insertValue , (error,result) => {
            if(error) return response.status(500).json({
                message : "Add Failed",
            })
            response.status(200).json({
                message : result
            })
        })
    })
}

const getAllBlogController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const sql = `SELECT e.* FROM tb_user u INNER JOIN tb_blog e ON u.id = e.user_id WHERE u.username = ?`;
    pool.query(sql , authenticatedUsername , (error,rows) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        })
        response.status(200).json({
            user : authenticatedUsername,
            data : rows
        })
    })
}

const editBlogController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const { id } = request.params;
    const { title,category,type,description } = request.body;
    const fileName              = request.file.filename;

    if(!title && !type && !category && !description && !fileName){
        return response.status(400).json({
            message : "Bad Request"
        })
    }
    const insertValue = [title,type,category,description,fileName,id,authenticatedUsername];
    const sql = `UPDATE tb_blog SET title = ?,type = ?,category = ?,description = ?,banner_image = ? WHERE id = ? AND user_id = (SELECT id FROM tb_user WHERE username = ?)`;
    pool.query(sql,insertValue,(error , result) => {
        if(error)return response.status(500).json({
            message : "Something went wrong"
        })
        response.status(200).json({
            result
        })
    })
}

const deleteBlogController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const { id } = request.params; // Blog ID to delete

    const sql = `DELETE FROM tb_blog WHERE id = ? AND user_id = (SELECT id FROM tb_user WHERE username = ?)`;
    const deleteValues = [id, authenticatedUsername];

    pool.query(sql, deleteValues, (error, result) => {
        if (error) {
            return response.status(500).json({
                message: "Something went wrong",
            });
        }

        if (result.affectedRows === 0) {

            return response.status(404).json({
                message: "Blog not found",
            });
        }

        response.status(200).json({
            message: "Blog deleted successfully",
        });
    });
}


module.exports.createNewBlogController = createNewBlogController;
module.exports.getAllBlogController = getAllBlogController;
module.exports.editBlogController = editBlogController;
module.exports.deleteBlogController = deleteBlogController;