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
        const token = Tokenizer.genToken(user.id, user.email)
        const user = await User.create({email, password:hashPassword, token})

        const basket = await Basket.create({userId: user.id})
        
        return res.json({token, user:{id, email}})

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
        const id = user.id;

        const token = Tokenizer.genToken(user.id, user.email)
        user.token = token
        await user.save()
        return res.json({token, user:{id, email}})
    }

    async verifyToken(req, res, next){
        const old_token = req.headers.authorization.split(' ')[1]
        const legit = await User.findOne({
            where: {
                token: old_token
            }
        })
        if(legit === null)
        {
            return res.status(401).json({message: 'Unauthorized'})
        }
        const token = Tokenizer.genToken(req.user.id, req.user.email)
        legit.token = token
        await legit.save()
        const {id, email} = legit
        return res.json({token, user:{id, email}})
    }

}

module.exports = new UserController()