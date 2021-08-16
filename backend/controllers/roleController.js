const { Role } = require("../models/models")

class RoleController {
    async getAll(req, res) {
        const roles = await Role.findAll()
        return res.json(roles)
    }

    async create(req, res) {
        const {title, description} = req.body
        const role = await Role.create({title, description})
        return res.json(role)
    }

    async update(req, res) {
        const {id, title, description} = req.body
        const role = await Role.findOne({ where: {
            id: id
        }})
        if(role === null) {
            return res.json({message: "No such instance in database!"})
        } else {
            role.title = title
            role.description = description
            role.save()
        }
        return res.json(role)
    }

    async delete(req, res) {
        const {id} = req.body
        const role = await Role.findOne({ where: {
            id: id
        }})
        if(role === null) {
            return res.json({message: "No such instance in database!"})
        } else {
            role.destroy()
        }
        return res.json({message: "Success! Instance gone."})
    }    

}

module.exports = new RoleController()