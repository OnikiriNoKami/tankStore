const Router = require('express')
const moduleController = require('../controllers/moduleController')
const router = new Router()

router.get('/tank/:tankId', moduleController.getByTankId)
router.get('/:id',moduleController.getById)
router.post('/', moduleController.create)
router.put('/', moduleController.update)
router.delete('/', moduleController.delete)


module.exports = router