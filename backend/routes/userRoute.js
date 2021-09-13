const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', authMiddleware, userController.getUsers)
//router.get('/:limit:offset', authMiddleware, userController.getUserById)
router.get('/:id', authMiddleware, userController.getUserById)
router.get('/find/:search', authMiddleware, userController.getUserBySubstring)
router.delete('/roles', authMiddleware, userController.removeUserRole)
router.post('/roles', authMiddleware, userController.addUserRoles)
router.post('/singleRole', authMiddleware, userController.addUserRole)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.verifyToken)

module.exports = router