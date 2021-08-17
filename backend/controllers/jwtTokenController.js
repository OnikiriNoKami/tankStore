const jwt = require('jsonwebtoken')

class Token {
    genToken(id, email){
        return jwt.sign({id, email}, process.env.SECRET_JWT_KEY, {
            expiresIn: '12h'
        })
    }
}

module.exports = new Token()