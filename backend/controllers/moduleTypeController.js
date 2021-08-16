const { ModuleType } = require("../models/models")

class ModuleTypeController {
    async getAll(req, res) {
        const moduleTypes = await ModuleType.findAll()
        return res.json(moduleTypes)
    }

    async create(req, res) {
        const {title} = req.body
        const moduleType = await ModuleType.create({title})
        return res.json(moduleType)
    }

    async update(req, res) {
        const {id, title} = req.body
        const moduleType = await ModuleType.findOne({ where: {
            id: id
        }})
        if(moduleType === null) {
            return res.json({message: "No such instance in database!"})
        } else {
            moduleType.title = title
            moduleType.save()
            return res.json(moduleType)
        }        
    }

    async delete(req, res) {
        const {id} = req.body
        const moduleType = await ModuleType.findOne({ where: {
            id: id
        }})
        if(moduleType === null) {
            return res.json({message: "No such instance in database!"})
        } else {
            moduleType.destroy()
        }
        return res.json({message: "Success! Instance gone."})
    }    

}

module.exports = new ModuleTypeController()

