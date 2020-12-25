const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const articleSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  subTitle: { type: String, default: '' },
  content: { type: String, default: '' },
  contentHtml: { type: String, default: '' },
  category: { type: String, default: null },
  tags: [{ type: String, default: null }],
  createDate: { type: Number, default: 0 },
  updateDate: { type: Number, default: 0 },
  cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
  _board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', index: true },
  _files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null }]
})


module.exports = mongoose.model('Article', articleSchema)