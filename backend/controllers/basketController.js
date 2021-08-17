const { Basket, BasketTank } = require("../models/models")


class BasketController {
    async getByUserId(req, res){
        const {userId} = req.params
        const basket = await Basket.findOne({
            where: {
                userId: userId
            }
        })

        if(basket === null) {
            return res.json({message: "Woah! No basket for no user!"})
        }

        return res.json({basket})
    }
    async getItems(req, res){
        const {baskedId} = req.params
        const items = await BasketTank.findAll({
            where: {
                baskedId: baskedId
            }
        })
        if(items === null){
            return res.json({message: "Nothing in basket."})
        }

        return res.json({items})
    }

    async addItemInBasket(req, res){
        const {basketId, tankId} = req.body

        const item = BasketTank.create({basketId,tankId})
        return res.json({item})
    }

    async deleteItemFromBasket(req, res){
        const {id} = req.body
        const item = BasketTank.findOne({
            where: {
                id: id
            }
        })
        if(item===null){
            return res.json({message:"No such instance in database!"})

        }
        await item.destroy()
        return res.json({message: 'Success!'})
    }
}

module.exports = new BasketController()