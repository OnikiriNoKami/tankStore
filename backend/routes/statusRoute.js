const Router = require('express')
const router = new Router()
const StatusController = require('../controllers/statusController')

router.get('/', StatusController.getAll)
router.post('/', StatusController.create)
router.put('/', StatusController.update)
router.delete('/', StatusController.delete)


module.exports = router