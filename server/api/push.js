const error = require('../util/error')
const response = require('../util/response')


function pushToken(req, res) {
  const token = req.query.t
  const deviceId = req.query.device_id
  const uid = req.query.uid || deviceId // default set to deviceId

  if (error.paramErrorHandler([token, deviceId, uid], res))
    return

  // TODO
  console.log(token)
  console.log(deviceId)

  response.response(null, '1111', res)
}

module.exports = {
  pushToken: pushToken,
}
