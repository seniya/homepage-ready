const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const subjects = [
  '강아지',
  '고양이',
  '집',
  '학교',
  '껍질',
  '명령',
  '반장',
  '부근',
  '선택',
  '역사가',
  '연구자',
  '연기자',
  '정리',
  '줄기',
  '토요일',
  '경찰관',
  '극장',
  '대문',
  '비극',
  '솜씨',
  '시내',
  '신',
]

const paintGameSchema = new mongoose.Schema({
  running: { type: Boolean, default: false },
  image: { type: String, default: '' }, // data
  users: { type: Array, default: [] },  // const users = ['player-1', 'player-2', 'player-3', 'player-4']
  keywords: { type: Array, default: subjects }
})

module.exports = mongoose.model('PaintGame', paintGameSchema)