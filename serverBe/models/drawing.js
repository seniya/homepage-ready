const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const drawingSchema = new mongoose.Schema({
  time: { type: Number, default: 0 },
  data: { type: String, default: '' },
  category: { type: String, default: '' },
})

module.exports = mongoose.model('Drawing', drawingSchema)