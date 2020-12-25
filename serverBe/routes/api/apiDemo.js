const express = require('express');
const createError = require('http-errors');
const router = express.Router();
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
const dest = path.join(__dirname, '../../../upload_demo/', strWeekOfMonth())


router.post('/upload-study', multer({
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
    title: 'simple-chat',
    readAll: true,
    useAble: true
  }

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


router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;