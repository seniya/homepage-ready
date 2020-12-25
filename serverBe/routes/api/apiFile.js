const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const imgConvert = require('base64-img')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path');
const moment = require('moment');
const FileEntity = require('../../models/files');

const multer = require('multer');

function weekOfMonth(m) {
  return m.week() - moment(m).startOf('month').week() + 1
}

function strWeekOfMonth() {
  const nowDate = moment(new Date())
  return nowDate.format('YYYY_MM_') + weekOfMonth(nowDate)
}
const dest = path.join(__dirname, '../../../upload/', strWeekOfMonth())

router.post('/upload', multer({
  dest: dest,
  limits: {
    fileSize: 20 * 1000 * 1000
  }
}).single('file'), (req, res, next) => {
  console.log('dest : ', dest);
  console.log(req.file)

  const {
    originalname,
    mimetype,
    destination,
    filename,
    path: path_,
    size
  } = req.file

  const fileItem = {
    originalname,
    mimetype,
    destination,
    filename,
    path: path_,
    size,
    ip: '1.1.1.1', //req.ip
    createDate: new Date().getTime(),
    updateDate: new Date().getTime(),
    articleId: null,
    _user: null,
    title: '',
    readAll: false,
    useAble: true
  }
  if (req.user._id) fileItem._user = req.user._id
  if (req.body.title) fileItem.title = req.body.title
  if (req.body.articleId) fileItem.articleId = req.body.articleId
  if (req.body.readAll) fileItem.readAll = req.body.readAll

  FileEntity.create(fileItem)
    .then(r => {
      r.url = process.env.NODE_ENV !== 'production' ? `http://localhost:3000/api/file/download/${r._id}` : `/api/file/download/${r._id}`
      r.extension = r.originalname.split('.').pop() || 'undefined'
      r.name = r.originalname
      console.log('/upload r.extension : ', r.extension)
      console.log('/upload r.name : ', r.name)
      res.send({ success: true, body: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

// editor.js attaches 모듈 전용
router.post('/attache', multer({
  dest: dest,
  limits: {
    fileSize: 2000 * 1000 * 1000
  }
}).single('file'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  const {
    originalname,
    mimetype,
    destination,
    filename,
    path,
    size
  } = req.file

  const fileItem = {
    originalname,
    mimetype,
    destination,
    filename,
    path,
    size,
    ip: '1.1.1.1', //req.ip
    createDate: new Date().getTime(),
    updateDate: new Date().getTime(),
    articleId: null,
    _user: null,
    title: '',
    readAll: true,
    useAble: true
  }
  if (req.user._id) fileItem._user = req.user._id
  if (req.body.title) fileItem.title = req.body.title
  if (req.body.articleId) fileItem.articleId = req.body.articleId
  if (req.body.readAll) fileItem.readAll = req.body.readAll

  FileEntity.create(fileItem)
    .then(r => {
      r.url = process.env.NODE_ENV !== 'production' ? `http://localhost:3000/api/file/download/${r._id}` : `/api/file/download/${r._id}`
      r.name = r.originalname
      r.size = r.size + ''
      res.send({ success: 1, file: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get("/download/:_id", (req, res, next) => {
  const _id = req.params._id
  console.log('_id : ', _id);
  FileEntity.findByIdAndUpdate(_id, { $inc: { 'cntDown': 1 } }, { new: true }).lean()
    .then(r => {
      const { originalname, mimetype, path: fpath } = r
      const dest_ = path.join(__dirname, '../../', fpath)
      console.log('dest_ : ', dest_);
      const stream = fs.createReadStream(fpath);
      stream.on('open', function () {
        res.setHeader('Content-disposition', 'inline; filename=' + originalname);
        res.setHeader('Content-type', mimetype);
        stream.pipe(res);
      })
      stream.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).end('Not found');
      })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

/*
router.post('/image', multer({ dest: `../upload/${strWeekOfMonth()}/` }).single('bin'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  imgConvert.base64(req.file.path, (err, fd) => {
    if (err) return next(err)
    console.log(fd.toString())
    fs.writeFileSync(`../upload/${strWeekOfMonth()}/${req.file.filename}.txt`, fd)
  })
  res.status(204).send()
})

router.post('/image/sharp', multer({ dest: `../upload/${strWeekOfMonth()}/` }).single('bin'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  const fn = req.file.path + 'sharp'
  sharp(req.file.path).resize(200, 200).crop(sharp.strategy.entropy).toFile(fn, (err, info) => {
    if (err) return next(err)
    imgConvert.base64(fn, (err, fd) => {
      if (err) return next(err)
      fs.unlinkSync(req.file.path)
      fs.unlinkSync(fn)
      console.log(fd.length)
      res.send(fd.toString())
    })
  })
})
*/

router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;