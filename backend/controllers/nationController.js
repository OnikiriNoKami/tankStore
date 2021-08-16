const { Nation } = require("../models/models");


class NationController {
    async getAll(req, res){
        const nations = await Nation.findAll()
        return res.json(nations)
    }

    async create(req, res){
        const {title} = req.body
        const nation = await Nation.create({title})
        return res.json(nation)
    }

    async update(req, res){
        const {id, title} = req.body
        const nation = await Nation.findOne({
            where: {
                id: id
            }
        })

        if(nation === null){
            return res.json({message: "No such instance in database!"})
        } else {
            nation.title = title
            nation.save()
            return res.json(nation)
        }
    }

    async delete(req, res){
        const {id} = req.body
        const nation = await Nation.findOne({
            where: {
                id: id
            }
        })

        if(nation === null){
            return res.json({message: "No such instance in database!"})
        } else {
            nation.destroy()
            return res.json({message: "Success! Instance gone."})
        }
    }
}

module.exports = new NationController()