const Router = require('express')
const moduleController = require('../controllers/moduleController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/tank/:tankId', moduleController.getByTankId)
router.get('/:id',moduleController.getById)
router.post('/',authMiddleware, moduleController.create)
router.put('/',authMiddleware, moduleController.update)
router.delete('/',authMiddleware, moduleController.delete)


module.exports = router