const { Tank } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')
const { renameProp } = require('../utils/utils')
const { Op } = require('sequelize');


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

    async update(req,res,next){
        try{
            const newTank = req.body
            renameProp(newTank, 'priceSilver', 'price_silver')
            renameProp(newTank, 'priceExp', 'price_exp')
            const oldTank = await Tank.findOne({
                attributes: ['id', 'title', 'description', 'price_silver', 'price_exp','nationId', 'tankTypeId', 'statusId'],
                where:{
                    id: newTank.id
                }
            })
            if(oldTank === null){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            }
            for(let [key, value] of Object.entries(newTank)){
                oldTank[key]? oldTank[key]=value : null
            }
            await oldTank.save()
            return res.json(oldTank)

        } catch (err){
            return next(err)
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
            const {limit, offset, title=''} = req.query
            delete filter.limit
            delete filter.offset
            title ? filter.title = {[Op.iLike]: `%${title}%`} : null
            tanks = await Tank.findAndCountAll({
                attributes: ['id', 'title', 'description', 'price_silver', 'price_exp','nationId', 'tankTypeId', 'statusId'],
                where: {
                    ...filter,  
                    },
                limit: limit,
                offset: offset,
                order: [
                    ['id','ASC']
                ]
            })
            

            return res.json(tanks)
        } catch (err){
            return next(err)
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