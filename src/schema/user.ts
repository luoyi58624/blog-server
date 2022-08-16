import mongoose from 'mongoose'
import { parseDate } from '../utils/commons'
import { encrypt } from '../utils/encrypt'

const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		set: value => encrypt(value)
	},
	nickname: {
		type: String,
		default: null
	},
	sex: {
		type: Boolean,
		default: true   // true为男，false为女
	},
	avatarUrl: {
		type: String,
		default: null
	},
	createDate: {
		type: String,
		default: parseDate(new Date())
	},
	updateDate: {
		type: String,
		default: null
	}
})

const User = mongoose.model('User', UserSchema)

export default User
