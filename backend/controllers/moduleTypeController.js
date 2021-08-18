const { ModuleType } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class ModuleTypeController {
    async getAll(req, res) {
        const moduleTypes = await ModuleType.findAll()
        return res.json(moduleTypes)
    }

    async create(req, res) {
        const {title} = req.body
        const moduleType = await ModuleType.create({title})
        return res.status(201).json(moduleType)
    }

    async update(req, res, next) {
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
    }

    async delete(req, res, next) {
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
}    

}

module.exports = new ModuleTypeController()

