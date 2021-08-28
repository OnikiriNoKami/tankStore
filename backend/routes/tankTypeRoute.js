const Router = require('express')
const tankTypeController = require('../controllers/tankTypeController')
const router = new Router()

router.get('/', tankTypeController.getAll)
router.get('/:search', tankTypeController.getBySubstring)
router.post('/', tankTypeController.create)
router.put('/', tankTypeController.update)
router.delete('/', tankTypeController.delete)

module.exports = router