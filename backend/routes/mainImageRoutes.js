const Router = require('express')
const mainImageController = require('../controllers/mainImageController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()



router.get('/:tankId', mainImageController.getById)
router.post('/', authMiddleware, mainImageController.create)
router.delete('/', authMiddleware, mainImageController.delete)


module.exports = router