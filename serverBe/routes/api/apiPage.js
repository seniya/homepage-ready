const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Page = require('../../models/pages')


router.post('/', function (req, res, next) {
  let { name } = req.body

  // 게시판은 체크하지 않는다.
  // if (name.indexOf('board/') > -1) {
  //   const nameArr = name.split('/')
  //   name = `${nameArr[0]}/${nameArr[1]}`
  // }
  if (name.indexOf('board/') > -1) {
    res.send({ success: true, d: req.user })
  } else {
    Page.findOne({ name })
      .then((r) => {
        if (!r) {
          if (req.user.lv) throw new Error(`페이지 ${name} 생성이 안되었습니다.`) // req.user.lv > 0
          return Page.create({ name })
        }
        if (r.lv < req.user.lv) throw new Error(`페이지 ${name} 이용 자격이 없습니다.`)
        return Page.updateOne({ _id: r._id }, { $inc: { inCnt: 1 } })
      })
      .then(() => {
        res.send({ success: true, d: req.user })
      })
      .catch((e) => {
        res.send({ success: false, msg: e.message })
      })
  }

});

router.all('*', function (req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;