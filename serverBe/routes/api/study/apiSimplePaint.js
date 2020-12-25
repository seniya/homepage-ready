const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Drawing = require('../../../models/drawing')

router.post('/paint/add', (req, res, next) => {
  const { category, data } = req.body
  const newObj = {
    category,
    data,
    time: new Date().getTime(),
  }

  Drawing.findOne({ category: category })
    .then(rs => {
      // console.log('Drawing.findOne rs : ', rs)
      if (rs) {
        return Drawing.updateOne({ _id: rs._id }, newObj)
      }
      return Drawing.create(newObj)
    })
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/paint/read/:_category', function (req, res, next) {
  const _category = req.params._category
  Drawing.findOne({ category: _category })
    .then(rs => {
      res.send({ success: true, body: rs })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

router.all('*', function (req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;