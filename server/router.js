const push = require('./api/push')


const routers = [
  { 'method': 'GET', 'path': '/push_token', 'handler': push.pushToken },
]

module.exports = {
  routers: routers,
}
