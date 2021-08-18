const Router = require('express')
const imageController = require('../controllers/imageController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()



router.get('/:tankId', imageController.getAllById)
router.post('/', authMiddleware, imageController.create)
router.delete('/', authMiddleware, imageController.delete)


module.exports = router