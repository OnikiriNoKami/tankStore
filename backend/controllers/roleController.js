const { Role } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')
const {Op, Sequelize} = require('sequelize')

class RoleController {
    async getAll(req, res) {
        try{
            const roles = await Role.findAll({
                attributes:['id','title','description']
            })
            return res.json(roles)
        } catch (err){
            console.log(err.message)
        }        
    }

    async getBySubstring(req, res, next){
        try {
            const {serch}= req.params

            const result = await Role.findAll({
                attributes:['id','title','description'],
                where: {
                    title: {
                        [Sequelize.Op.iLike]: `%${search}%`
                    }
                }
            })

            if(result.length===0){
                return next(ApiError.badRequest(message.NOT_IN_DATABASE))
            }else{
                return res.json(result)
            }

        } catch {
            console.log(err.message)
        }
    }

    async create(req, res) {
        try {
            const {title, description} = req.body
            const role = await Role.create({title, description})
            return res.status(201).json(role)
        } catch (err){
            console.log(err.message)
        }
    }

    async update(req, res, next) {
        try{
            const {id, title, description} = req.body
            const role = await Role.findOne({ 
                attributes:['id','title','description'],
                where: {
                id: id
            }})
            if(role === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                role.title = title
                role.description = description
                await role.save()
                return res.json(role)
            }
        } catch (err){
            console.log(err.message)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const role = await Role.findOne({ where: {
                id: id
            }})
            if(role === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                await role.destroy()
                return res.json({message: messages.DELETION_SUCCESS})
            }

        } catch (err){
            console.log(err.message)
        }
    }    

}

module.exports = new RoleController()