const Router = require('express')
const NationController = require('../controllers/nationController')
const router = new Router()

router.get('/', NationController.getAll)
router.post('/', NationController.create)
router.put('/', NationController.update)
router.delete('/', NationController.delete)


module.exports = router