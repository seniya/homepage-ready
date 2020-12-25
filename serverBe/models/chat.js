const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const chatSchema = new mongoose.Schema({
  id: { type: Number, default: 0, index: true },
  time: { type: Number, default: 0 },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  user: { type: String, default: '' }
})

module.exports = mongoose.model('Chat', chatSchema)