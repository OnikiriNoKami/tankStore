const { Status } = require("../models/models");


class StatusController {
    async getAll(req, res){
        const statuses = await Status.findAll()
        return res.json(statuses)
    }
    async create(req, res){
        const {title} = req.body
        const status = await Status.create({title})
        return res.json(status)

    }

    async update(req, res){
        const {id, title} = req.body
        const status = await Status.findOne({
            where: {
                id: id
            }
        })

        if(status === null){
            return res.json({message: 'No such instance in database!'})
        } else {
            status.title = title
            status.save()
            return res.json(status)
        }
    }

    async delete(req, res){
        const {id} = req.body
        const status = await Status.findOne({
            where: {
                id: id
            }
        })

        if(status === null){
            return res.json({message: 'No such instance in database!'})
        } else {
            status.destroy()
            return res.json({message: "Success! Instance gone."})
        }
    }
}

module.exports = new StatusController()