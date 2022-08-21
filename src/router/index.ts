import express from 'express'
import userRouter from './user'
import roleRouter from './role'
import menuRouter from './menu'

const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		code: 200,
		msg: 'hello,罗懿'
	})
})

router.use('/user', userRouter)
router.use('/role', roleRouter)
router.use('/menu', menuRouter)

export default router
