const Router = require('express')
const moduleTypeController = require('../controllers/moduleTypeController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', moduleTypeController.getAll)
router.get('/:search', moduleTypeController.getBySubstring)
router.post('/',authMiddleware, moduleTypeController.create)
router.put('/',authMiddleware, moduleTypeController.update)
router.delete('/',authMiddleware, moduleTypeController.delete)


module.exports = router