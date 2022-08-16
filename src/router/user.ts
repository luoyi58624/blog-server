import express from 'express'
import User from '../schema/user'
import redisClient from '../plugins/redis'
import { tokenAuth } from '../middle/auth'
import { parseDate } from '../utils/commons'
import { encrypt } from "../utils/encrypt";

const router = express.Router()

router.get('/', tokenAuth, async (req, res) => {
	const { _id, p, size } = req.query
	let datas
	if (_id) {
		datas = await User.find({ _id: req.query._id })
	} else {
		datas = await User.find()
			.skip((Number(p) - 1) * Number(size))
			.limit(Number(size))
	}
	res.send({
		code: 200,
		msg: '用户查询成功',
		data: {
			datas,
			count: await User.countDocuments()
		}
	})
})

router.post('/', tokenAuth, async (req, res, next) => {
	try {
		const userData = await User.findOne({
			username: req.body.username
		})
		if (userData) {
			res.send({
				code: 500,
				msg: '用户名已存在'
			})
		} else {
			const user = new User(req.body)
			await user.save()
			res.send({
				code: 200,
				msg: '用户新增成功',
				data: user
			})
		}
	} catch (e) {
		next(e)
	}
})

router.put('/', tokenAuth, async (req, res, next) => {
	try {
		const userData = await User.findOne({
			_id: req.body._id
		})
		if (!userData) {
			res.send({
				code: 500,
				msg: '该用户不存在'
			})
		} else {
			if (req.body.password == userData.password) {
				delete req.body.password
			}
			req.body.updateDate = parseDate(new Date())
			await User.updateOne({_id: req.body._id}, req.body)
			res.send({
				code: 200,
				msg: '用户更新成功'
			})
		}
	} catch (e) {
		next(e)
	}
})

router.delete('/', tokenAuth, async (req, res) => {
	if (!req.query.ids) {
		res.send({
			code: 500,
			msg: '请选择数据'
		})
	} else {
		const ids = (<string>req.query.ids).split(',')
		for (let i = 0; i < ids.length; i++) {
			await User.deleteOne({ _id: ids[i] })
		}
		res.send({
			code: 200,
			msg: '用户删除成功'
		})
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const data = await User.findOne({
			username: req.body.username,
			password: req.body.password
		})
		if (data) {
			const token = encrypt(data._id.toHexString())
			await redisClient.set(token, JSON.stringify(data))
			res.send({
				code: 200,
				msg: '登录成功',
				data: {
					token,
					data
				}
			})
		} else {
			res.send({
				code: 500,
				msg: '用户名或密码错误'
			})
		}
	} catch (e) {
		next(e)
	}
})

router.get('/logout', tokenAuth, async (req, res, next) => {
	try {
		await redisClient.del(req.header('token')!)
		res.send({
			code: 200,
			msg: '退出成功'
		})
	} catch (e) {
		next(e)
	}
})

export default router
