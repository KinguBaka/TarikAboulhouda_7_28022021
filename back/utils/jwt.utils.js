// Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'BONJOURJESUISLETOKEN';

// Exported functions
module.exports = {
    generateTokenForUser: userData => {
        return jwt.sign({
            userId: userData.is,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '12h'
        })
    }
}