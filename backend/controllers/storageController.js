const { Storage } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')


class StorageController {
    async getByTankId(req, res) {
        const {tankId} = req.params
        const storage = await Storage.findOne({
            where: {
                tankId: tankId
            }
        })

        if(storage === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            return res.json(storage)
        }
    }

    async create(req, res){
        const {tankId, amount} = req.body
        const storage = await Storage.create({
            amount, tankId
        })

        return res.status(201).json(storage)
    }

    async update(req, res, next){
        const {id, tankId, amount} = req.body
        const storage = await Storage.findOne({
            where: {
                id: id
            }
        })
        if(storage === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            storage.tankId = tankId
            storage.amount = amount
            await storage.save()
            return res.json(storage)
        }
    }

    async delete(req, res){
        const {id} = req.body
        const storage = await Storage.findOne({
            where: {
                id: id
            }
        })

        if(storage === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            await storage.destroy()
            return res.json({message: messages.DELETION_SUCCESS})
        }        
    }
}

module.exports = new StorageController()