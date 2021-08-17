const { Storage } = require("../models/models");


class StorageController {
    async getByTankId(req, res) {
        const {tankId} = req.params
        const storage = await Storage.findOne({
            where: {
                tankId: tankId
            }
        })

        return res.json(storage)
    }

    async create(req, res){
        const {tankId, amount} = req.body
        const storage = await Storage.create({
            amount, tankId
        })

        return res.json(storage)
    }

    async update(req, res){
        const {id, tankId, amount} = req.body
        const storage = await Storage.findOne({
            where: {
                id: id
            }
        })
        if(storage === null) {
            return res.json({message: "No such instance in database!"})
        } else {
            storage.tankId = tankId
            storage.amount = amount
            storage.save()
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
            return res.json({message: "No such instance in database!"})
        } else {
            storage.destroy()
            return res.json({message: "Success! Instance gone."})
        }        
    }
}

module.exports = new StorageController()