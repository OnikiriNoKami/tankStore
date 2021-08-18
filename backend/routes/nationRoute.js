const Router = require('express')
const NationController = require('../controllers/nationController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', NationController.getAll)
router.post('/', authMiddleware, NationController.create)
router.put('/', authMiddleware, NationController.update)
router.delete('/',authMiddleware, NationController.delete)


module.exports = router