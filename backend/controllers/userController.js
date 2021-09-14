const bcrypt = require('bcrypt')
const {User, Basket, Role} = require('../models/models')
const Tokenizer = require('./jwtTokenController')
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')
const { badRequest } = require('../error/ApiError')
const { Op } = require( 'sequelize');

class UserController {
    async registration(req, res, next){
        try {
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
            const token = Tokenizer.genToken(user.id, user.email)
            user.token = token
            await user.save()
            const basket = await Basket.create({userId: user.id})
            const id = user.id
            return res.json({token, user:{id, email}})
        } catch (err){
            return next(ApiError(err))
        }

    }

    async getUsers(req,res,next){
        try{
            const {limit, offset} = req.query
            const users = await User.findAndCountAll({
                attributes: ['id', 'email'],
                offset: offset,
                limit: limit
            })
            if(users.length === 0){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                return res.json(users)
            }

        } catch (err) {
            return next(err)
        }
    }

    async getUserById(req, res, next){
        try {
            const {id} = req.params

            const user = await User.findByPk(id, {
                attributes: ['id', 'email'],
                include:{
                    model: Role,
                    as: 'roles',
                    attributes: ['id', 'title', 'description'],
                    through:{
                        attributes:[]
                    }
                }
            })
            if (user === null){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                return res.json(user)
            }

        } catch (err){
            return next(err)
        }
    }

    async getUserBySubstring(req, res, next){
        try{
            const { search } = req.params
            const {limit, offset} = req.query

            const result = await User.findAndCountAll({
                attributes: ['id', 'email'],
                where:{
                    email: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                offset: offset,
                limit: limit,
            })

            if(result.length === 0){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                return res.json(result)
            }

        } catch (err){
            return next(err)
        }
    }

    async addUserRoles(req, res, next){
        try {
            const {id, roles} = req.body

            const user = await User.findByPk(id, {
                attributes: ['id'],
                include: {
                    model: Role,
                    as: 'roles',
                    attributes: ['id']
                }
            })

            if(user === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                const rolesToSet = roles.filter((role) => {
                    
                    if(user.roles.some(elem => elem.id===role)){
                        return false
                    } else {
                        return true
                    }
                })

                if( rolesToSet.length !== 0){
                    for (const role of rolesToSet){
                        await user.addRole(role)
                    }
                    return res.status(201).json('Success.')
                } else {
                    return next(ApiError.badRequest('No roles to add.'))
                }
            }

        } catch (err){
            return next(err)
        }
    }

    async addUserRole(req, res, next){
        try{
            const { id, role } = req.body

            const user = await User.findByPk(id, {
                attributes: ['id'],
                include: {
                    model: Role,
                    as: 'roles',
                    attributes: ['id']
                }
            })

            if(user === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                if(user.roles.includes(role)){
                    return next(ApiError.badRequest('Role is already appointed.'))
                } else {
                    await user.addRole(role)
                    return res.status(201).json('Success.')
                }
            }

        } catch (err){
            return next(err)
        }
    }

    async removeUserRole(req, res, next){
        try{
            const {id, role} = req.body

            const user = await User.findByPk(id,{
                attributes: ['id'],
                include: {
                    model: Role,
                    as:'roles',
                    attributes:['id'],
                    through: {
                        attributes:[]
                    }
                }
            })

            if(user === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                if(user.roles.some(rl => rl.id===role)){
                    await user.removeRole(role)
                    return res.status(200).json('Ok.')
                } else {
                    return next(ApiError.internal("Can't delete."))
                }
                
            }

        } catch (err){
            return next(err)
        }
    }

    async login(req, res, next){
        try{
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
        } catch (err){
            return next(ApiError(err))
        }
    }

    async verifyToken(req, res, next){
        try {
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
    
        } catch (err){
            return next(err)
        }
    }

}

module.exports = new UserController()