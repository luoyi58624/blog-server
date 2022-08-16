import redisClient from '../plugins/redis'

export async function tokenAuth(req, res, next) {
	try {
		const token = req.header('token')
		if (token) {
			const userData = await redisClient.get(token)
			if (userData) {
				next()
			} else {
				res.send({
					code: 401,
					msg: '无效token'
				})
			}
		} else {
			res.send({
				code: 401,
				msg: '用户未登录'
			})
		}
	} catch (e) {
		next(e)
	}
}
