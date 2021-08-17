const { TankType } = require("../models/models");

class TankTypeController {
    async getAll(req, res) {
        const tankTypes = await TankType.findAll()
        return res.json(tankTypes)
    }
    
    async create(req, res) {
        const {title, title_short} = req.body
        const tankType = await TankType.create({title, title_short})
        return res.json(tankType)
    }

    async update(req, res){
        const {id, title, title_short} = req.body
        const tankType = await TankType.findOne({
            where: {
                id: id
            }
        })

        if(tankType === null){
            return res.json({message:"No such instance in database!"})
        } else {
            tankType.title = title
            tankType.title_short = title_short
            tankType.save()
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
            return res.json({message:"No such instance in database!"})
        } else {
            tankType.destroy()
            return res.json({message: "Success! Instance gone."})
        }
    }


}

module.exports = new TankTypeController()