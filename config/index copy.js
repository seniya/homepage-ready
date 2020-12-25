module.exports = {

  // admin: {
  //   id: 'admin',
  //   pwd: '1234',
  //   name: '관리자'
  // },

  // dbUrl: 'mongodb://malrang:dedgr223Ss@seniya2.iptime.org:27017/vue-node',
  dbUrl: 'mongodb://homepage:sfad230@seniya2.iptime.org:27017/homepage',

  jwt: {
    secretKey: 'adsdf asdf very secretKey very',
    issuer: 'MALRANG',
    algorithm: 'HS256',
    subject: 'HOMEPAGE',
    expiresIn: 60 * 3, // 기본 3분
    expiresInRemember: 60 * 60 * 24 * 6, // 기억하기 눌렀을 때 6일
    expiresInDiv: 3 // 토큰시간 나누는 기준
  },

  recaptchaSecret: '6Lct4NIZAAAAABYVj3Cvm5TyQwu9VkjrKFUp4y12' // google testkey
}
