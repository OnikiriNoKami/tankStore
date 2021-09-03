const { TankType } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')
const {Op} = require('sequelize');

class TankTypeController {
    async getAll(req, res) {
        try {
            const tankTypes = await TankType.findAll({
                attributes:
                    ['id', 'title', 'title_short']
                
            })
            return res.json(tankTypes)

        } catch (err){
            return next(err)
        }
    }
    
    async create(req, res) {
        try {
            const {title, title_short} = req.body
            const tankType = await TankType.create({title, title_short})
            return res.status(201).json(tankType)

        } catch (err){
            return next(err)
        }
    }
    async getBySubstring(req, res, next){
        try{
            const {search} = req.params
            const result = await TankType.findAll({
                attributes:
                    ['id', 'title', 'title_short']
                ,
                where:{
                    [Op.or]:[
                    {
                        title: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    {
                        title_short:{
                            [Op.iLike]: `%${search}%`
                        }
                    }
                    ]
                    
                }
            })
            if(result.length === 0){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                return res.json(result)
            }

        } catch (err){
            return next(err)
        }
    }


    async update(req, res, next){
        try {
            const {id, title, title_short} = req.body
            const tankType = await TankType.findOne({
                attributes:
                    ['id', 'title', 'title_short'],
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

        } catch (err){
            return next(err)
        }
    }

    async delete(req, res){
        try {
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
        } catch (err){
            return next(err)
        }
    }
}

module.exports = new TankTypeController()