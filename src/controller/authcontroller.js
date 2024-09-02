const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();
const { pool } = require('../DB/database');
const {generateToken} = require('../utils/generateToken');
const {isPasswordValid} = require('../utils/verifiyPassword');
const userRegisterController = async (request, response) => {
    const image = request.file;
    const { username, email, password } = request.body;

    try {
        const saltRounds = parseInt(process.env.round_number) || 10; // Use a default value if not defined
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        if (username && email && hashedPassword && image) {
            const sql = `INSERT INTO tb_user (username, email, password, profile) VALUES (?, ?, ?, ?)`;
            const insertValue = [username, email, hashedPassword, image.filename];

            pool.query(sql, insertValue, (error, result) => {
                if (error) return response.status(500).json({ message: "Something Went Wrong" });
                
                response.status(200).json({
                    message: "Register Success",
                    token : generateToken({ username })
                });
            });
        } else {
            response.status(400).json({
                message: "All Fields Must Not Be Empty"
            });
        }
    } catch (error) {
        response.status(500).json({ message: "Error in Registration Process", error: error.message });
    }
};

const userLoginController = async (request,response) => {
    const { email , password } = request.body;
    if(email && password) {
        const sql = `SELECT * FROM tb_user WHERE email = ?`
        pool.query(sql,email,(error,row) => {
            if(error) return response.status(500).json({ message : "Something went wrong" })
            if(row){
                const isPasswordValidate = isPasswordValid(password , row[0].password);
                if(isPasswordValidate){
                    const username = row[0].username;
                    const token = generateToken({ username });
                    response.status(200).json({
                        message : "Login Success",
                        token : token
                    })
                }
            }
        })
    }
    else{
        return response.status(401).json({message : "All Field Must not be empty"})
    }
} 

module.exports.userRegisterController = userRegisterController;
module.exports.userLoginController = userLoginController;
