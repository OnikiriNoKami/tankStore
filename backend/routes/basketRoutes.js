const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()

router.get('/:userId', basketController.getByUserId)
router.get('/items/:basketId',basketController.getItems)
router.post('/', basketController.addItemInBasket)
router.delete('/', basketController.deleteItemFromBasket)

module.exports = router