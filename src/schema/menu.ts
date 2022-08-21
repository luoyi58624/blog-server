import mongoose from 'mongoose'
import { parseDate } from '../utils/commons'
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  menuName: {
    type: String,
    required: true
  },
  routePath: {
    type: String,
    default: ''
  },
  redirectPath: {
    type: String,
    default: ''
  },
  componentPath: {
    type: String,
    default: ''
  },
  menuIcon: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true
  },
  parentMenuId:{
    type: String,
    default: ''
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

const Menu = mongoose.model('Menu', MenuSchema)

export default Menu
