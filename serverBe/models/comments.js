const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const commentSchema = new mongoose.Schema({
  content: { type: String, default: '' },
  cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', index: true }
})

module.exports = mongoose.model('Comment', commentSchema)