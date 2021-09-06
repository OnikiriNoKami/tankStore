const jwt = require('jsonwebtoken')
const messages = require('../message/authRelated')

module.exports = function (req, res, next){
    console.log('Authentication try.')
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        if(req.headers.authorization)
        {
            const parseToken = req.headers.authorization.split(' ')
            const tokenType = parseToken[0]
            const token = parseToken[1]
            if(!token) {
                return res.status(401).json({message: messages.NOT_AUTHORIZED})
            }
            const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
            req.user = decoded
            next()
        } else {
            return res.status(401).json({message: messages.NO_TOKEN})
        }
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
}