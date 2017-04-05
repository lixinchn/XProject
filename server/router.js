const push = require('./api/push')
const message = require('./api/message')
const joke = require('./api/joke')


const routers = [
  { 'method': 'GET', 'path': '/push_token', 'handler': push.pushToken },
  { 'method': 'GET', 'path': '/message', 'handler': message.message },
  { 'method': 'GET', 'path': '/joke', 'handler': joke.joke },
]

module.exports = {
  routers: routers,
}
