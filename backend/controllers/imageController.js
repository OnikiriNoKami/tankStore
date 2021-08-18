const uuid = require('uuid')
const {Image} = require('../models/models')
const path = require('path')
const ApiError = require('../error/ApiError')
const messages = require('../message/databaseRelated')
const fs = require('fs')

class ImageController {
    async create(req, res, next){
        const {tankId} = req.body
        const {file} = req.files
        let fileName = uuid.v4() +'.jpg'

        file.mv(path.resolve(__dirname, '..', 'static', fileName))
        const img = await Image.create({tankId,
            image: fileName
        })

        return res.status(201).json(img)

    }

    async getAllById(req, res, next){
        const {tankId} = req.params
        const images = Image.findAll({
            where: {
                tankId: tankId
            }
        })

        return res.json(images)
    }

    async delete(req, res, next){
        const {id} = req.body
        const image = Image.findOne({
            where: {
                id: id
            }
        })

        if(image === null) {
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
        } else {
            fs.unlink(path.resolve(__dirname, '..', 'static', image.image), (err) => {
                err ? console.log(err.message) : console.log(`File ${image.image} deleted`)
            })
            await image.destroy()
            return res.json({message: messages.DELETION_SUCCESS})
        }
    }
}

module.exports = new ImageController()