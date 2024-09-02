const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const validateToken = (request,response,next) => {
    const authHeader = request.headers['authorization'];

    if(!authHeader) return response.status(401).json({
        message : "Unauthorized"
    })

    const token = authHeader.split(" ")[1].trim();

    if(!token) return response.status(500).json({
        message : "Token is Null"
    })

    jwt.verify(token , process.env.jwt_secret_key , (error,user) => {
        if(error) return response.status(401).json({
            message : "Token Invalid"
        })
        request.user = user;
        next();
    })
}

module.exports.validateToken = validateToken;