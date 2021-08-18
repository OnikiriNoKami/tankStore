const { Nation } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class NationController {
    async getAll(req, res){
        const nations = await Nation.findAll()
        return res.json(nations)
    }

    async create(req, res){
        const {title} = req.body
        const nation = await Nation.create({title})
        return res.status(201).json(nation)
    }

    async update(req, res, next){
        const {id, title} = req.body
        const nation = await Nation.findOne({
            where: {
                id: id
            }
        })

        if(nation === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            nation.title = title
            await nation.save()
            return res.json(nation)
        }
    }

    async delete(req, res, next){
        const {id} = req.body
        const nation = await Nation.findOne({
            where: {
                id: id
            }
        })

        if(nation === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            await nation.destroy()
            return res.json({message: messages.DELETION_SUCCESS})
        }
    }
}

module.exports = new NationController()