import express from 'express'
import Role from '../schema/role'
import { tokenAuth } from '../middle/auth'
import { parseDate } from '../utils/commons'

const router = express.Router()

router.get('/', tokenAuth, async (req, res) => {
	const { _id, p, size } = req.query
	let datas
	if (_id) {
		datas = await Role.find({ _id: req.query._id })
	} else {
		datas = await Role.find()
			.skip((Number(p) - 1) * Number(size))
			.limit(Number(size))
	}
	res.send({
		code: 200,
		msg: '查询成功',
		data: {
			datas,
			count: await Role.countDocuments()
		}
	})
})

router.post('/', tokenAuth, async (req, res, next) => {
	try {
		const userData = await Role.findOne({
			roleName: req.body.roleName
		})
		if (userData) {
			res.send({
				code: 500,
				msg: '数据已存在'
			})
		} else {
			const user = new Role(req.body)
			await user.save()
			res.send({
				code: 200,
				msg: '新增成功',
				data: user
			})
		}
	} catch (e) {
		next(e)
	}
})

router.put('/', tokenAuth, async (req, res, next) => {
	try {
		req.body.updateDate = parseDate(new Date())
		await Role.updateOne(
			{
				_id: req.body._id
			},
			req.body
		)
		res.send({
			code: 200,
			msg: '更新成功'
		})
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
			await Role.deleteOne({ _id: ids[i] })
		}
		res.send({
			code: 200,
			msg: '删除成功'
		})
	}
})
export default router
