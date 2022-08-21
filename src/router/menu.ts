import express from 'express'
import Menu from '../schema/menu'
import { tokenAuth } from '../middle/auth'
import { parseDate } from '../utils/commons'

const router = express.Router()

router.get('/', tokenAuth, async (req, res) => {
	res.send({
		code: 200,
		msg: '查询成功',
		data: await Menu.find()
	})
})

router.post('/', tokenAuth, async (req, res, next) => {
	try {
		const newData = new Menu(req.body)
		await newData.save()
		res.send({
			code: 200,
			msg: '新增成功',
			data: newData
		})
	} catch (e) {
		next(e)
	}
})

router.put('/', tokenAuth, async (req, res, next) => {
	try {
		req.body.updateDate = parseDate(new Date())
		await Menu.updateOne(
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
			await Menu.deleteOne({ _id: ids[i] })
		}
		res.send({
			code: 200,
			msg: '删除成功'
		})
	}
})
export default router
