const { Role } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class RoleController {
    async getAll(req, res) {
        try{
            const roles = await Role.findAll()
            return res.json(roles)
        } catch (err){
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
            const role = await Role.findOne({ where: {
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