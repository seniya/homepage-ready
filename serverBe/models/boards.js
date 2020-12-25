const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const boardSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true, unique: true },
  title: { type: String, default: '' },
  type: { type: String, default: '' },
  readLv: { type: Number, default: 0 },
  createLv: { type: Number, default: 0 },
  categories: { type: Array, default: ['Default'] },
  tags: { type: Array, default: ['Default'] },
  createDate: { type: Number, default: 0 },
  updateDate: { type: Number, default: 0 },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
})

module.exports = mongoose.model('Board', boardSchema)