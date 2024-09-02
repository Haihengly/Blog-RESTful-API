const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const generateToken = username => {
    return jwt.sign(
        username,
        process.env.jwt_secret_key,
        {
            expiresIn : process.env.jwt_expired
        }
    )
};

module.exports.generateToken = generateToken;