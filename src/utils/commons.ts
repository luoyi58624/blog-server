import dayjs from 'dayjs'

/**
 * 判断一个对象 || 数组 || 字符串(包括空格) 是否为空
 * @example null、undefined、'undefined'、[]、''、' '
 * @param obj
 * @return {boolean}
 */
export function isEmpty(obj) {
	if (obj === null || obj === undefined || obj === 'undefined') {
		return true
	} else if (Array.isArray(obj)) {
		return obj.length === 0
	} else if (typeof obj === 'string') {
		return obj.trim().length === 0
	} else {
		return false
	}
}

/**
 * 解析日期
 * @param date
 * @param format
 * @returns {string}
 */
export function parseDate(date, format?) {
	if (isEmpty(date)) {
		return undefined
	} else {
		format = format || 'YYYY-MM-DD HH:mm:ss'
		return dayjs(date).format(format)
	}
}

/**
 * 异步延迟执行
 * @param time  延迟时间，单位毫秒
 * @returns {Promise<void>}
 */
export async function sleep(time?) {
	time = time || 1000
	await execTimeout(time)

	function execTimeout(time) {
		return new Promise(resolve => setTimeout(resolve, time))
	}
}
