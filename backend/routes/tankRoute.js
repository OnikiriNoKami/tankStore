const Router = require('express')
const tankController = require('../controllers/tankController')
const router = new Router()

router.get('/', tankController.getAll)
router.get('/:id', tankController.getOne)
router.post('/', tankController.create)
router.put('/', tankController.update)
router.delete('/', tankController.delete)

module.exports = router