const express = require('express')
const Dotenv = require('dotenv');
Dotenv.config();
const port = process.env.PORT;
const { pool } = require("./src/DB/database")
const {authRouter} = require("./src/route/authroute");
const {userRouter} = require('./src/route/userroute');
const {blogRouter} = require('./src/route/blogrote');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('public',express.static('uploads'));

pool.getConnection((error, connection) => {
    if(error) console.log("Can not connect to database");
    console.log("Successfully connect to database"); 
})

app.use('/api/auth/', authRouter);
app.use('/api/user/', userRouter);
app.use('/api/blog/', blogRouter);




app.listen(port, (response,request) => {
    console.log(`http://localhost:${port}`);
})