const { ModuleType } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class ModuleTypeController {
    async getAll(req, res) {
        try {
            const moduleTypes = await ModuleType.findAll()
            return res.json(moduleTypes)
        } catch (err) {
            console.log(err.message)
        }
    }

    async create(req, res) {
        try {
            const {title} = req.body
            const moduleType = await ModuleType.create({title})
            return res.status(201).json(moduleType)
        } catch (err){
            console.log(err.message)
        }
    }

    async update(req, res, next) {
        try {
            const {id, title} = req.body
            const moduleType = await ModuleType.findOne({ where: {
                id: id
            }})
            if(moduleType === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                moduleType.title = title
                await moduleType.save()
                return res.json(moduleType)
            }
        }   catch (err) {
            console.log(err.message)
        }     
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const moduleType = await ModuleType.findOne({ where: {
                id: id
            }})
            if(moduleType === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                await moduleType.destroy()
                return res.json({message: messages.DELETION_SUCCESS})
            }

        } catch (err){
            console.log(err.message)
        }
    }    

}

module.exports = new ModuleTypeController()

