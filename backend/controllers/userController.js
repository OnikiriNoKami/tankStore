const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')
const Tokenizer = require('./jwtTokenController')
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class UserController {
    async registration(req, res, next){
        const {email, password} = req.body
        if(!email || !password){
            return next(ApiError.badRequest(messages.USER_DATA_PROBLEMS))
        } 

        const user_exist = await User.findOne({
            where: {
                email: email
            }
        })

        if(user_exist){
            return next(ApiError.badRequest(messages.USER_EXIST))
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({email, password:hashPassword})

        const basket = await Basket.create({userId: user.id})
        const token = Tokenizer.genToken(user.id, user.email)

        return res.json({token})

    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(user === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } 
        let passwordGood = bcrypt.compareSync(password, user.password)
        if(!passwordGood){
            return next(ApiError.badRequest(messages.USER_DATA_PROBLEMS))
        }

        const token = Tokenizer.genToken(user.id, user.email)
        return res.json({token})
    }

    async verifyToken(req, res){
        const token = Tokenizer.genToken(req.user.id, req.user.email)
        return res.json({token})
    }

}

module.exports = new UserController()