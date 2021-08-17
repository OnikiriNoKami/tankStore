const uuid = require('uuid')
const path = require('path')
const { Module } = require('../models/models')
class ModuleController {
    async create(req, res){
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
    
            return res.json(module)
        } catch (e) {
            return res.json({message: e.message})
        }
    }

    async getById(req, res){
        const {id} = req.params
        const module = await Module.findOne({
            where: {
                id:id
            }
        })

        if(module === null) {
            return res.json({message: "No such instance in database!"})
        } else {
            return res.json(module)
        }  
    }

    async getByTankId(req, res){
        const {tankId} = req.params
        const modules = await Module.findAll({
            where: {
                tankId: tankId
            }
        })

        if(modules === null) {
            return res.json({message: "No such instances in database!"})
        } else {
            return res.json(modules)
        }  
    }

    async update(req, res){
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
                return res.json({message: "No such instance in database!"})
            } else {
                module.title = title
                module.description = description
                module.tankId = tankId
                module.price_exp = price_exp
                module.price_silver = price_silver
                module.moduleTypeId = moduleTypeId
                module.order_index = order_index
                module.image = fileName || module.image
                module.save()
                return res.json(module)
            } 
        } catch (e) {
            return res.json({message: e.message})
        }
    }

    async delete(req, res){
        const {id} = req.body
        const module = await Module.findOne({
            where: {
                id: id
            }
        })

        if(module === null) {
            return res.json({message: "No such instances in database!"})
        } else {
            module.destroy()
            return res.json({message: "Success!"})
        }  
    }
}

module.exports = new ModuleController()