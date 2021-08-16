const Router = require('express')
const rolecontroller = require('../controllers/roleController')
const roleController = require('../controllers/roleController')
const router = new Router()

router.get('/', roleController.getAll)
router.post('/', roleController.create)
router.put('/', roleController.update)
router.delete('/',roleController.delete)


module.exports = router