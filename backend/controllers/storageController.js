const { Storage } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')


class StorageController {
    async getByTankId(req, res) {
        try{
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

        } catch (err){
            console.log(err.message)
        }
    }

    async create(req, res){
        try {
            const {tankId, amount} = req.body
            const storage = await Storage.create({
                amount, tankId
            })

            return res.status(201).json(storage)
        } catch (err){
            console.log(err.message)
        }
    }

    async update(req, res, next){
        try {
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
        } catch (err){
            console.log(err.message)
        }
    }

    async delete(req, res){
        try {
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
        } catch (err){
            console.log(err.message)
        }
    }
}

module.exports = new StorageController()