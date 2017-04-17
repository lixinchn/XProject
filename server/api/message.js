const error = require('../util/error')
const response = require('../util/response')


function message(req, res) {
  const deviceId = req.query.device_id
  const maxId = req.query.max_id
  const uid = req.query.uid || deviceId // default set to deviceId

  if (error.paramErrorHandler([deviceId, uid, maxId], res))
    return

  // TODO
  console.log(deviceId)
  console.log(uid)
  console.log(maxId)

  response.response(null, '1111', res)
}

function messageAlert(req, res) {
  const deviceId = req.query.device_id
  const maxId = req.query.max_id
  const uid = req.query.uid || deviceId

  if (error.paramErrorHandler([deviceId, uid, maxId], res))
    return

  // TODO
  // TODO
  console.log(deviceId)
  console.log(uid)
  console.log(maxId)

  response.response(null, '1111', res)
}

module.exports = {
  message: message,
}
