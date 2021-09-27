const { Tank } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')


class TankController {
    async create(req, res){
        try{
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
    
            return res.status(201).json(tank)
        } catch (err){
            return res.json({error_message:err.message})
        }
    }

    async update(req, res, next){
        try{
            const new_tank = req.body
            const old_tank = await Tank.findOne({
                attributes: ['id', 'title', 'description', 'price_silver', 'price_exp','nationId', 'tankTypeId', 'statusId'],
                where:{
                    id: new_tank.id
                }
            })
            if(old_tank === null){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            }

            old_tank.title = new_tank.title
            old_tank.descriotion = new_tank.descriotion
            old_tank.price_silver = new_tank.price_silver
            old_tank.price_exp = new_tank.price_exp
            old_tank.nationId = new_tank.nationId
            old_tank.tankTypeId = new_tank.tankTypeId
            old_tank.statusId = new_tank.statusId
            await old_tank.save()
            return res.json(old_tank)
        } catch (err){
            return res.json({error_message:err.message})
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.body
            const tank = await Tank.findOne({
                where: {
                    id: id
                }
            })
            if(tank === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                await tank.destroy()
                return res.json({message: messages.DELETION_SUCCESS})
            }
        } catch (err){
            return res.json({error_message:err.message})
        }
    }



    async getAll (req,res,next) {
        try {
            let tanks;
            const filter = {...req.query}
            tanks = await Tank.findAll({
                attributes: ['id', 'title', 'description', 'price_silver', 'price_exp','nationId', 'tankTypeId', 'statusId'],
                    where:filter
            })
            

            return res.json(tanks)
        } catch (err){
            return res.json({error_message:err.message})
        }
    }

    async getOne(req, res){
        try {
            const {id} = req.params

            const tank = await Tank.findOne({
                attributes: ['id', 'title', 'description', 'price_silver', 'price_exp','nationId', 'tankTypeId', 'statusId'],
                where: {
                    id: id
                }
            })
            if(tank===null){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            }
            return res.json(tank)
        } catch (err) {
            return res.json({error_message:err.message})
        }
    }
}

module.exports = new TankController()