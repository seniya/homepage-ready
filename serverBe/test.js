var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, '아무도모르는비밀키');
console.log('token : ', token)