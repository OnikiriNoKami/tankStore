const { Nation } = require("../models/models");
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')
const { Op, Sequelize } = require('sequelize')

class NationController {
    async getAll(req, res){
        try{
            const nations = await Nation.findAll()
        return res.json(nations)
        } catch (err){
            console.log(err.message)
        }
    }

    async create(req, res){
       try {
        const {title} = req.body
        const nation = await Nation.create({title})
        return res.status(201).json(nation)
       } catch (err){
           console.log(err.message)
       }
    }

    async getBySubstring(req, res, next){
        try{
            const {search} = req.params
            const result = await Nation.findAll({
                where:{
                    title: {
                        [Sequelize.Op.iLike]: `%${search}%`
                    }
                }
            })

            if(result.length===0){
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                return res.json(result)
            }

        } catch (err){
            console.log(err.message)
        }
    }

    async update(req, res, next){
        try{
            const {id, title} = req.body
        const nation = await Nation.findOne({
            where: {
                id: id
            }
        })

        if(nation === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            nation.title = title
            await nation.save()
            return res.json(nation)
        }

        } catch (err){
            console.log(err.message)
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.body
        const nation = await Nation.findOne({
            where: {
                id: id
            }
        })

        if(nation === null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            await nation.destroy()
            return res.json({message: messages.DELETION_SUCCESS})
        }

        } catch (err){
            console.log(err.message)
        }
    }
}

module.exports = new NationController()