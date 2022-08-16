import mongoose from 'mongoose'
import { parseDate } from '../utils/commons'
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  roleName: {
    type: String,
    required: true
  },
  roleDesc: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true
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

const Role = mongoose.model('Role', RoleSchema)

export default Role
