const { TankType } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class TankTypeController {
    async getAll(req, res) {
        const tankTypes = await TankType.findAll()
        return res.json(tankTypes)
    }
    
    async create(req, res) {
        const {title, title_short} = req.body
        const tankType = await TankType.create({title, title_short})
        return res.status(201).json(tankType)
    }

    async update(req, res, next){
        const {id, title, title_short} = req.body
        const tankType = await TankType.findOne({
            where: {
                id: id
            }
        })

        if(tankType === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            tankType.title = title
            tankType.title_short = title_short
            await tankType.save()
            return res.json(tankType)
        }
    }

    async delete(req, res){
        const {id} = req.body
        const tankType = await TankType.findOne({
            where: {
                id: id
            }
        })

        if(tankType === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            await tankType.destroy()
            return res.json({message: messages.DELETION_SUCCESS})
        }
    }
}

module.exports = new TankTypeController()