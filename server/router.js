const push = require('./api/push')
const message = require('./api/message')
const joke = require('./api/joke')
const init = require('./api/init')
const upDown = require('./api/up-down')


const routers = [
  { 'method': 'GET', 'path': '/push_token', 'handler': push.pushToken },
  { 'method': 'GET', 'path': '/msg', 'handler': message.message },
  { 'method': 'GET', 'path': '/joke', 'handler': joke.joke },
  { 'method': 'GET', 'path': '/init', 'handler': init.init },
  { 'method': 'GET', 'path': '/up', 'handler': upDown.up },
  { 'method': 'GET', 'path': '/down', 'handler': upDown.down },
]

module.exports = {
  routers: routers,
}
