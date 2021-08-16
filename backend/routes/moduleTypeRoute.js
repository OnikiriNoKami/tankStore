const Router = require('express')
const moduleTypeController = require('../controllers/moduleTypeController')
const router = new Router()

router.get('/', moduleTypeController.getAll)
router.post('/', moduleTypeController.create)
router.put('/', moduleTypeController.update)
router.delete('/', moduleTypeController.delete)


module.exports = router