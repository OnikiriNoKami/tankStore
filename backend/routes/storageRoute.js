const Router = require('express')
const storageController = require('../controllers/storageController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/:tankId', storageController.getByTankId)
router.post('/',authMiddleware, storageController.create)
router.put('/',authMiddleware, storageController.update)
router.delete('/',authMiddleware, storageController.delete)


module.exports = router