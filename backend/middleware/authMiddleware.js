const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const parseToken = req.headers.authorization.split(' ')
        const tokenType = parseToken[0]
        const token = parseToken[1]
        if(!token) {
            return res.json({message: 'Woah not authorized!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.json({message: e.message})
    }
}