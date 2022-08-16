import express from 'express'
import redisClient from './plugins/redis'
import { connectMongoDB } from './plugins/mongodb'

const dotenv = require('dotenv')
const bodyParser = require('body-parser')

import router from './router'

const app = express()

dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router)

app.use((req, res, next) => {
	res.status(404).send({
		code: 404,
		msg: 'Api NotFound'
	})
})

app.use((err, req, res, next) => {
	console.error(err)
	res.status(500).send({
		code: 500,
		msg: 'Server Error!',
		data: err.toString()
	})
})

app.listen(process.env.APP_PORT, async () => {
	const start = Date.now()
	await Promise.all([connectMongoDB(), redisClient.connect()])
	const end = Date.now()
	console.log(`数据库连接耗时：${end - start}ms`)
	console.log(`服务已启动： http://localhost:${process.env.APP_PORT}`)
})
