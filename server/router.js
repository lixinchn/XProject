const push = require('./api/push')
const message = require('./api/message')
const joke = require('./api/joke')


const routers = [
  { 'method': 'GET', 'path': '/push_token', 'handler': push.pushToken },
  { 'method': 'GET', 'path': '/msg', 'handler': message.message },
  { 'method': 'GET', 'path': '/joke', 'handler': joke.joke },
  { 'method': 'GET', 'path': '/msg_alert', 'handler': joke.messageAlert },
]

module.exports = {
  routers: routers,
}
