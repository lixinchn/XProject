const error = require('../util/error')
const response = require('../util/response')
const UpDown = require('../model/up-down')


function up(req, res) {
  upDown(req, res, 'up')
}

function down(req, res) {
  upDown(req, res, 'down')
}

async function upDown(req, res, upOrDown) {
  const uid = req.query.uid
  const id = req.query.id
  const cancel = req.query.cancel == 1

  if (error.paramErrorHandler([uid, id], res))
    return

  const upDown = new UpDown.UpDown()
  let handler = upOrDown === 'up' ? upDown.up : upDown.down
  let results = await handler(uid, id, cancel)
  response.response(null, results, res)
}

module.exports = {
  up: up,
  down: down,
}
