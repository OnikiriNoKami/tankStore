const uuid = require('uuid')
const {Image} = require('../models/models')
const path = require('path')
const ApiError = require('../error/ApiError')
const messages = require('../message/databaseRelated')
const fs = require('fs')

class ImageController {
    async create(req, res, next){
        try {
            const {tankId} = req.body
            const {file} = req.files
            let fileName = uuid.v4() +'.jpg'

            file.mv(path.resolve(__dirname, '..', 'static', fileName))
            const img = await Image.create({tankId,
                image: fileName
            })

            return res.status(201).json(img)
        } catch (err){
            console.log(err.message)
        }

    }

    async getAllById(req, res, next){
        try {
            const {tankId} = req.params
            const images = Image.findAll({
                where: {
                    tankId: tankId
                }
            })

            return res.json(images)
        } catch (err){
            console.log(err.message)
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.body
            const image = await Image.findOne({
                where: {
                    id: id
                }
            })
            console.log(image)
            
            if(image === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE))
            } else {
                try {
                    fs.unlink(path.resolve(__dirname,'..','static', image.title), (errs) => {
                        if(errs){
                            return res.json({message: errs.message})
                        }
                        console.log(`Image ${image.title} deleted`)
                    })
                    await image.destroy()
                    return res.json({message: messages.DELETION_SUCCESS})
                } catch (err){
                    return res.json({message: err.message})
                }
                
            }
        } catch {
            console.log(err.message)
        }
    }
}

module.exports = new ImageController()