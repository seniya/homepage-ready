const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Board = require('../../models/boards')
const Article = require('../../models/articles')

router.get('/', (req, res, next) => {  
  Article.find()
  .sort({ name: -1 })
  .select('-contentHtml')  //, '-contentHtml'
    .then(rs => {
      res.send({ success: true, data: rs, token: req.token, msg: null })
    })
    .catch(e => {
      res.send({ success: false, data: null, token: req.token, msg: e.message })
    })
})

router.get('/list/:_board', (req, res, next) => {
  let { itemsPerPage, page, _board, sortBy, sortDesc } = req.query
  let sort = {}

  if (!itemsPerPage) itemsPerPage = 10
  if (!page) page = 1
  if (sortBy != undefined && sortDesc != undefined) {
    if (sortBy.length > 0 && sortDesc.length > 0) {
      const sortTarget = sortBy[0]
      const sortOrder = sortDesc[0] === 'true' ? -1 : 1
      sort[sortTarget] = sortOrder
    }
  } else {
    sort = { updateDate: -1 }
  }


  // console.log('sortDesc : ', sortDesc)
  // console.log('sort : ', sort)

  page = parseInt(page)
  itemsPerPage = parseInt(itemsPerPage)

  const f = {}
  let totalDocs = 0

  if (req.params._board) f._board = req.params._board

  console.log('req.params._board : ', req.params._board)
  console.log('f : ', f)

  Article.countDocuments(f)
    .then(r => {
      totalDocs = r
      console.log('totalDocs : ', r)
      return Article.find(f)
        .sort(sort)
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        // .where('title').regex(search)
        // .sort(s)
        // .skip(skip)
        // .limit(limit)
        .select('-content')
        .populate('_user', '-pwd')
    })
    .then(rs => {

      const meta = {
        itemsPerPage,
        page,
        totalDocs
      }

      const r = {
        docs: rs,
        meta
      }

      res.send({ success: true, body: r, token: req.token })
      // res.send({ success: true, t: total, body: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})


router.get('/read/:_id', (req, res, next) => {
  const _id = req.params._id
  let atc = {}
  Article.findByIdAndUpdate(_id, { $inc: { 'cnt.view': 1 } }, { new: true }).lean()
    .then(r => {
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.post('/:_board', (req, res, next) => {
  const _board = req.params._board
  if (!_board) return res.send({ success: false, msg: '게시판이 선택되지 않았습니다' }) // 나중에 400 bad request 처리 예제
  const { title, content, contentHtml, category, subTitle, tags } = req.body
  Board.findOne({ _id: _board })
    .then(r => {
      if (!r) return res.send({ success: false, msg: '잘못된 게시판입니다' })
      if (r.createLv < req.user.lv) return res.send({ success: false, msg: '권한이 없습니다' })
      const atc = {
        title,
        content,
        contentHtml,
        category,
        subTitle,
        tags,
        ip: '1.1.1.1', // 무의미..
        createDate: new Date().getTime(),
        updateDate: new Date().getTime(),
        _board,
        _user: null
      }
      if (req.user._id) atc._user = req.user._id
      return Article.create(atc)
    })
    .then(r => {
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})


router.put('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '게시물 수정 권한이 없습니다' })
  const _id = req.params._id

  Article.findOne({ _id })
    .then(r => {
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      if (r._user.toString() !== req.user._id) throw new Error('본인이 작성한 게시물이 아닙니다')
      // const data = req.body;
      req.body.updateDate = new Date().getTime()
      return Article.findOneAndUpdate({ _id }, { $set: req.body }, { new: true })
    })
    .then(r => {
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '게시물 수정 권한이 없습니다' })
  const _id = req.params._id

  Article.findOne({ _id }).populate('_user', 'lv')
    .then(r => {
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      if (!r._user) {
        if (req.user.lv > 0) throw new Error('손님 게시물은 삭제가 안됩니다')
      }
      else {
        if (r._user._id.toString() !== req.user._id) {
          if (r._user.lv < req.user.lv) throw new Error('본인이 작성한 게시물이 아닙니다')
        }
      }
      return Article.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.all('*', function (req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;