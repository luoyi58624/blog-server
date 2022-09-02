import express from 'express';
import expressWs from 'express-ws';
import redisClient from './plugins/redis';
import { connectMongoDB } from './plugins/mongodb';

const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

import router from './router';

// 引入 websocket
const { app } = expressWs(express());
app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.ws('/menu', function (ws, req) {
	ws.on('message', function (msg) {
		console.log('---菜单---');
		console.log(msg);
		ws.send(msg);
	});
	// console.log('socket', req);
});

app.use((req, res, next) => {
	res.status(404).send({
		code: 404,
		msg: 'Api NotFound'
	});
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send({
		code: 500,
		msg: 'Server Error!',
		data: err.toString()
	});
});

app.listen(process.env.APP_PORT, async () => {
	const start = Date.now();
	await Promise.all([connectMongoDB(), redisClient.connect()]);
	const end = Date.now();
	console.log(`数据库连接耗时：${end - start}ms`);
	console.log(`服务已启动： http://localhost:${process.env.APP_PORT}`);
});
