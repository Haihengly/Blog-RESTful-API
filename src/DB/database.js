const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host : process.env.db_host,
    port : process.env.db_port,
    user : process.env.db_user,
    password : process.env.db_password,
    database : process.env.db_name
})

module.exports.pool = pool;