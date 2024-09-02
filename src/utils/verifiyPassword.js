const bcrypt = require('bcrypt')
const isPasswordValid = (password , hashedPassword) => {
    return bcrypt.compare(password , hashedPassword);
}
module.exports.isPasswordValid = isPasswordValid;