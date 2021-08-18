const uuid = require('uuid')
const path = require('path')
const { Module } = require('../models/models')
const messages = require('../message/databaseRelated')
class ModuleController {
    async create(req, res, next){
        try {
            const {title, description, 
                tankId, price_silver, price_exp,
                order_index, moduleTypeId
            } = req.body
    
            const {image} = req.files
            let fileName = uuid.v4()+".jpg"
    
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const module = await Module.create({
                title, description, tankId, 
                moduleTypeId, price_silver,
                price_exp, order_index, image: fileName
            })
    
            return res.status(201).json(module)
        } catch (e) {
            return next(e)
        }
    }

    async getById(req, res, next){
        const {id} = req.params
        const module = await Module.findOne({
            where: {
                id:id
            }
        })

        if(module === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            return res.json(module)
        }  
    }

    async getByTankId(req, res, next){
        const {tankId} = req.params
        const modules = await Module.findAll({
            where: {
                tankId: tankId
            }
        })

        if(modules === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            return res.json(modules)
        }  
    }

    async update(req, res, next){
        try {
            const {id, title, description, 
                tankId, price_silver, price_exp,
                order_index, moduleTypeId
            } = req.body
    
            const {image} = req.files
            let fileName = null
            if(image){
                fileName = uuid.v4()+".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
            }        
            
            const module = await Module.findOne({
                where: {
                    id: id
                }
            })

            if(module === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                module.title = title
                module.description = description
                module.tankId = tankId
                module.price_exp = price_exp
                module.price_silver = price_silver
                module.moduleTypeId = moduleTypeId
                module.order_index = order_index
                module.image = fileName || module.image
                await module.save()
                return res.json(module)
            } 
        } catch (e) {
            return next(e)
        }
    }

    async delete(req, res, next){
        const {id} = req.body
        const module = await Module.findOne({
            where: {
                id: id
            }
        })

        if(module === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            module.destroy()
            return res.json({message: messages.DELETION_SUCCESS})
        }  
    }
}

module.exports = new ModuleController()