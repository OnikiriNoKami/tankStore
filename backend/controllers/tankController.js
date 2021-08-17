const { Tank } = require("../models/models")


class TankController {
    async create(req, res){
        const {
            title, description,
            price_silver, price_exp,
            nationId, tankTypeId, statusId
        } = req.body

        const tank = await Tank.create({
            title: title,
            description: description,
            price_silver: price_silver,
            price_exp: price_exp,
            nationId: nationId,
            tankTypeId: tankTypeId,
            statusId: statusId
        })

        return res.json(tank)
    }

    async update(req, res){
        const new_tank = req.body
        const old_tank = await Tank.findOne({
            where:{
                id: new_tank.id
            }
        })
        if(old_tank === null){
            return res.json({message:"No such instance in database!"})
        }

        old_tank.title = new_tank.title
        old_tank.descriotion = new_tank.descriotion
        old_tank.price_silver = new_tank.price_silver
        old_tank.price_exp = new_tank.price_exp
        old_tank.nationId = new_tank.nationId
        old_tank.tankTypeId = new_tank.tankTypeId
        old_tank.statusId = new_tank.statusId
        old_tank.save()
        return res.json(old_tank)
    }

    async delete(req, res){
        const {id} = req.body

        const tank = await Tank.findOne({
            where: {
                id: id
            }
        })
        if(tank == null) {
            return res.json({message:"No such instance in database!"})
        }

        tank.destroy()
        return res.json({message:"Success!"})
    }

    async getAll(req, res){
        const {tankTypeId, nationId} = req.query
        let tanks;
        if(!tankTypeId && !nationId){
            tanks = await Tank.findAll()
        }
        if(tankTypeId && !nationId){
            tanks = await Tank.findAll({
                where:{
                    tankTypeId: tankTypeId
                }
            })
        }
        if(!tankTypeId && nationId){
            tanks = await Tank.findAll({
                where:{
                    nationId: nationId
                }
            })
        }
        if(tankTypeId && nationId){
            tanks = await Tank.findAll({
                where:{
                    tankTypeId: tankTypeId,
                    nationId: nationId
                }
            })
        }

        return res.json(tanks)

    }

    async getOne(req, res){
        const {id} = req.params

        const tank = await Tank.findOne({
            where: {
                id: id
            }
        })
        if(tank===null){
            return res.json({message:"No such instance in database!"})
        }
        return res.json(tank)
    }
}

module.exports = new TankController()