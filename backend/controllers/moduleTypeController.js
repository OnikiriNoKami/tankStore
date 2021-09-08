const { ModuleType } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize")

class ModuleTypeController {
    async getAll(req, res, next) {
        try {
            const moduleTypes = await ModuleType.findAll()
            return res.json(moduleTypes)
        } catch (err) {
            return next(err)
        }
    }

    async create(req, res, next) {
        try {
            const {title} = req.body
            const moduleType = await ModuleType.create({title})
            return res.status(201).json(moduleType)
        } catch (err){
            return next(err)
        }
    }

    async getBySubstring(req, res, next){
        try{
            const {search} = req.params
            const result = await ModuleType.findAll({
                attributes: ['id','title'],
                where: {
                    title:{
                        [Op.iLike]: `%${search}%`
                    }
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

    async update(req, res, next) {
        try {
            const {id, title} = req.body
            const moduleType = await ModuleType.findOne({ where: {
                id: id
            }})
            if(moduleType === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                moduleType.title = title
                await moduleType.save()
                return res.json(moduleType)
            }
        }   catch (err) {
            return next(err)
        }     
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const moduleType = await ModuleType.findOne({ where: {
                id: id
            }})
            if(moduleType === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                await moduleType.destroy()
                return res.json({message: messages.DELETION_SUCCESS})
            }

        } catch (err){
            return next(err)
        }
    }    

}

module.exports = new ModuleTypeController()

