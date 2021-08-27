const { Basket, BasketTank } = require("../models/models")
const messages = require('../message/databaseRelated')
const ApiError = require('../error/ApiError')

class BasketController {
    async getByUserId(req, res, next){
        try {
            const {userId} = req.params
        const basket = await Basket.findOne({
            where: {
                userId: userId
            }
        })
        
        if(basket === null) {
            return next(ApiError.badRequest(messages.BASKET_NOT_FOUND))
        }

        return res.json({basket})
        } catch (err){
            console.log(err.message)
        }
    }
    async getItems(req, res, next){
        try{
            const {baskedId} = req.params
        const items = await BasketTank.findAll({
            where: {
                baskedId: baskedId
            }
        })
        if(items === null){
            return next(ApiError.badRequest(messages.BASKET_EMPTY))
        }

        return res.json({items})
        } catch (err) {
            console.log(err.message)
        }
    }

    async addItemInBasket(req, res){
        try {
            const {basketId, tankId} = req.body

        const item = await BasketTank.create({basketId,tankId})
        return res.status(201).json({item})

        } catch (err){
            console.log(err.message)
        }
    }

    async deleteItemFromBasket(req, res, next){
        try {
            const {id} = req.body
        const item = BasketTank.findOne({
            where: {
                id: id
            }
        })
        if(item===null){
            return next(ApiError.badRequest(messages.NOT_IN_DATABASE))

        }
        await item.destroy()
        return res.json({message: 'Success!'})
        } catch (err){
            console.log(err.message)
        }
    }
}

module.exports = new BasketController()