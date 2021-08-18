const Router = require('express')
const router = new Router()
const StatusController = require('../controllers/statusController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', StatusController.getAll)
router.post('/',authMiddleware, StatusController.create)
router.put('/',authMiddleware, StatusController.update)
router.delete('/',authMiddleware, StatusController.delete)


module.exports = router