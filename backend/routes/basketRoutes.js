const Router = require('express')
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/:userId',authMiddleware, basketController.getByUserId)
router.get('/items/:basketId',authMiddleware, basketController.getItems)
router.post('/',authMiddleware, basketController.addItemInBasket)
router.delete('/',authMiddleware, basketController.deleteItemFromBasket)

module.exports = router