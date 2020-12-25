var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.all('*', function (req, res, next) {
  if (req.user.lv > 0) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

router.use('/user', require('./apiManageUser.js'))
router.use('/page', require('./apiManagePage.js'))
router.use('/site', require('./apiManageSite.js'))
router.use('/board', require('./apiManageBoard.js'))

router.all('*', function (req, res, next) {
  // if (req.user.lv) return res.send({ success: false, msg: '권한이 없습니다.' })
  if (req.user.lv) throw createError(403, '권한이 없습니다.')
  next()
})

module.exports = router;