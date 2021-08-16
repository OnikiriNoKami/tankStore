const Router = require('express')
const router = new Router()

const moduleRouter = require('./moduleRoute')
const moduleTypeRouter = require('./moduleTypeRoute')
const nationRouter = require('./nationRoute')
const roleRouter = require('./roleRoute')
const statusRouter = require('./statusRoute')
const tankRouter = require('./tankRoute')
const tankTypeRouter = require('./tankTypeRoute')
const userRouter = require('./userRoute')

router.use('/user', userRouter)
router.use('/module', moduleRouter)
router.use('/nation', nationRouter)
router.use('/role', roleRouter)
router.use('/status', statusRouter)
router.use('/tank', tankRouter)
router.use('/tank_type', tankTypeRouter)
router.use('/module_type', moduleTypeRouter)

module.exports = router