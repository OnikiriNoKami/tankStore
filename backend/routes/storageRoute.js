const Router = require('express')
const storageController = require('../controllers/storageController')
const router = new Router()

router.get('/:tankId', storageController.getByTankId)
router.post('/', storageController.create)
router.put('/', storageController.update)
router.delete('/', storageController.delete)


module.exports = router