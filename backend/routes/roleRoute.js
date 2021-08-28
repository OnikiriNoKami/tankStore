const Router = require('express')
const rolecontroller = require('../controllers/roleController')
const roleController = require('../controllers/roleController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', roleController.getAll)
router.get('/:search', roleController.getBySubstring)
router.post('/',authMiddleware, roleController.create)
router.put('/',authMiddleware, roleController.update)
router.delete('/', authMiddleware, roleController.delete)


module.exports = router