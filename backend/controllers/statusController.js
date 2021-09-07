const { Status } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')


class StatusController {
    async getAll(req, res, next){
        try {
            const statuses = await Status.findAll()
            return res.json(statuses)

        } catch (err) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        }
    }
    async create(req, res, next){
        try{
            const {title} = req.body
            const status = await Status.create({title})
            return res.status(201).json(status)

        }catch (err){
            return next(err)
        }
    }

    async update(req, res, next){
        try {
            const {id, title} = req.body
            const status = await Status.findOne({
                where: {
                    id: id
                }
            })

            if(status === null){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                status.title = title
                await status.save()
                return res.json(status)
            }
        } catch (err){
            return next(err)
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.body
            const status = await Status.findOne({
                where: {
                    id: id
                }
            })

            if(status === null){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                await status.destroy()
                return res.json({message: messages.DELETION_SUCCESS})
            }
        } catch (err){
            return next(err)
        }
    }
}

module.exports = new StatusController()