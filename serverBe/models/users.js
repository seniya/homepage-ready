const mongoose = require('mongoose')
const cfg = require('../../config')
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  age: { type: Number, default: 1 },
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: '' },
  lv: { type: Number, default: 2 },
  inCnt: { type: Number, default: 0 },
  email: { type: String, default: '' },
  photo: { type: String, default: '' },
  googleId: { type: String, default: '' },
  facebookId: { type: String, default: '' },
  snsToken: { type: String, default: '' },
  termsAgree: { type: Boolean, default: false },
  approval: { type: Boolean, default: false },
  retry: { type: Number, default: 0 }
})

const User = mongoose.model('User', userSchema);

/*
User.findOne({ id: cfg.admin.id })
  .then((r) => {
    if (!r) return User.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name })
    return Promise.resolve(null)
  })
  .then((r) => {
    if (r) console.log(`admin:${r.id} created!`)
  })
  .catch((e) => {
    console.error(e.message)
  })
*/

module.exports = User

