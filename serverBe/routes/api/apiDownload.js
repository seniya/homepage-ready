const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const FileEntity = require('../../models/files')

router.get("/:_id", (req, res, next) => {
  const _id = req.params._id
  FileEntity.findByIdAndUpdate(_id, { $inc: { 'cntDown': 1 } }, { new: true }).lean()
    .then(r => {
      const { originalname, mimetype, path: fpath, readAll } = r
      if (!readAll) res.send({ success: false, msg: '파일 권한이 없습니다.' })

      try {
        const stream = fs.createReadStream(path.join(__dirname, '../../', fpath));
        stream.on('open', function () {
          res.setHeader('Content-disposition', 'inline; filename=' + originalname);
          res.setHeader('Content-type', mimetype);
          stream.pipe(res);
        })
        stream.on('error', function () {
          res.setHeader('Content-Type', 'text/plain');
          res.status(404).end('Not found');
        })
      } catch (e) {
        res.send({ success: false, msg: e.message })
      }
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;