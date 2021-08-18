const Router = require('express')
const tankController = require('../controllers/tankController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', tankController.getAll)
router.get('/:id', tankController.getOne)
router.post('/',authMiddleware, tankController.create)
router.put('/',authMiddleware, tankController.update)
router.delete('/',authMiddleware, tankController.delete)

module.exports = router