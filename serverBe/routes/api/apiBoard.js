const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Board = require('../../models/boards')

router.get('/', (req, res, next) => {
  Board.find().sort({ name: -1 })
    .then(rs => {
      res.send({ success: true, data: rs, token: req.token, msg: null })
    })
    .catch(e => {
      res.send({ success: false, data: null, token: req.token, msg: e.message })
    })
})

router.get('/:id', (req, res, next) => {
  const _id = req.params.id
  console.log('/board/:id : ', _id)
  Board.findOne({ _id })
    .then(rs => {
      res.send({ success: true, data: rs, token: req.token, msg: null })
    })
    .catch(e => {
      res.send({ success: false, data: null, token: req.token, msg: e.message })
    })
})

router.get('/read/:name', (req, res, next) => {
  const name = req.params.name
  Board.findOne({ name })
    .then(r => {
      // 권한으로 못보게 하려면..
      // if (r.readLv < req.user.lv) return res.send({ success: false, msg: `${name} 게시판을 볼 수 있는 자격이 없습니다.` })
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/list', (req, res, next) => {
  Board.find().sort({ name: -1 })
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})



router.all('*', function (req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;