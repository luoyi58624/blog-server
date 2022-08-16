import * as crypto from 'crypto'

const priviteKey = 'luoyiluoyiluoyiluoyi'

// 使用md5进行加密
export function encrypt(data) {
	return crypto
		.createHash('md5')
		.update(priviteKey + data)
		.digest('hex')
}
