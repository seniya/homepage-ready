const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const crypto = require('crypto')

const jwt = require('jsonwebtoken')
const cfg = require('../../../config')
const User = require('../../models/users')
const request = require('request')


const signToken = (_id, id, lv, name, rmb) => { // _id add
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm
    }
    if (rmb) o.expiresIn = cfg.jwt.expiresInRemember // 6일
    jwt.sign({ _id, id, lv, name }, cfg.jwt.secretKey, o, (err, token) => { // _id add    
      if (err) reject(err)
      resolve(token)
    })
  })
}

router.post('/in', (req, res) => {
  const { id, pwd, remember } = req.body
  if (!id) throw createError(400, '아이디가 없습니다')
  if (!pwd) throw createError(400, '비밀번호가 없습니다')
  if (remember === undefined) throw createError(400, '기억하기가 없습니다.')
  User.findOne({ id })
    .then((r) => {
      // throw createError(400, '몰라몰라1') // 아래 catch로 내려감
      if (!r) throw new Error('존재하지 않는 아이디입니다.')
      const p = crypto.scryptSync(pwd, r._id.toString(), 64, { N: 1024 }).toString('hex')
      // console.log('p : ', p)
      if (r.pwd !== p) throw new Error('비밀번호가 틀립니다.')
      return signToken(r._id, r.id, r.lv, r.name, remember)
    })
    .then((r) => {
      res.send({ success: true, body: r })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
      // next(createError(401, e.massage))
    })
})

router.get('/userInfo', (req, res) => {
  const { id } = req.user
  if (!id) throw createError(400, '아이디가 없습니다')
  User.findOne({ id })
    .then((r) => {
      // throw createError(400, '몰라몰라1') // 아래 catch로 내려감
      if (!r) throw new Error('존재하지 않는 아이디입니다.')
      res.send({ success: true, body: r })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
      // next(createError(401, e.massage))
    })
})

router.post('/up', (req, res, next) => {
  const u = req.body
  if (!u.id) throw createError(400, '아이디가 없습니다')
  if (!u.pwd) throw createError(400, '비밀번호가 없습니다')
  if (!u.name) throw createError(400, '이름이 없습니다')
  if (!u.response) throw createError(400, '로봇 검증이 없습니다')

  const ro = {
    uri: 'https://www.google.com/recaptcha/api/siteverify',
    json: true,
    form: {
      secret: cfg.recaptchaSecretKey,
      response: u.response,
      remoteip: req.ip
    }
  }
  request.post(ro, (err, response, body) => {
    if (err) throw createError(401, '로봇 검증 실패입니다')

    User.findOne({ id: u.id })
      .then((r) => {
        if (r) throw new Error('이미 등록되어 있는 아이디입니다')
        return User.create(u)
      })
      .then((r) => {
        const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex')
        return User.updateOne({ _id: r._id }, { $set: { pwd } })
      })
      .then((r) => {
        res.send({ success: true })
      })
      .catch((e) => {
        res.send({ success: false, msg: e.message })
      })
  })
})

router.post('/out', (req, res) => {
  res.send({ success: false, msg: '아직 준비 안됨' })
})

router.post('*', (req, res, next) => {
  next(createError(404, '그런 api 없어'))
})

module.exports = router