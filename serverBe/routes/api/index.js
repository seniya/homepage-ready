const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const moment = require('moment')
const jwt = require('jsonwebtoken');
const cfg = require('../../../config')

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰 입니다.'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

const signToken = (_id, id, lv, name, exp) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 시간
      algorithm: cfg.jwt.algorithm,
      expiresIn: exp
    }
    jwt.sign({ _id, id, lv, name }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const getToken = async (t) => {
  let vt = await verifyToken(t)
  if (vt.lv > 2) return { user: vt, token: null }
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
  // console.log('토큰차이 :', diff)
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / cfg.jwt.expiresInDiv) return { user: vt, token: null }

  const nt = await signToken(vt._id, vt.id, vt.lv, vt.name, expSec)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}

router.all('*', function (req, res, next) {

  let token = req.headers.authorization
  if(token !== undefined && token.length > 7) {
    token = token.slice(7)
  }
  //console.log('token : ', token)
  getToken(token) // 토큰 검사
    .then((v) => {
      // console.log(v)
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => next(createError(401, e.message)))
})

router.use('/siteInfo', require('./apiSite.js'))
router.use('/board', require('./apiBoard.js'))
router.use('/sign', require('./apiSign.js'))
router.use('/download', require('./apiDownload.js'))
router.use('/demo', require('./apiDemo.js'))
router.use('/study', require('./study/apiSimplePaint'))

router.use('/pageAuth', require('./apiPage.js'))
router.use('/article', require('./apiArticle.js'))
router.use('/manage', require('./manage'))
router.use('/file', require('./apiFile.js'))
router.use('/link', require('./apiLink.js'))


router.all('*', function (req, res, next) {
  // 또 검사해도 됨
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

module.exports = router