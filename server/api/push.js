const error = require('../util/error')
const response = require('../util/response')
const pushManager = require('../model/push-token-manager')


function pushToken(req, res) {
  const deviceToken = req.query.device_token
  const deviceId = req.query.device_id
  const uid = req.query.uid
  const osType = req.query.os

  if (error.paramErrorHandler([deviceToken, deviceId, osType], res))
    return

  if (error.paramOsErrorHandler(osType, res))
    return

  const manager = new pushManager.PushTokenManager()
  manager.update(uid, deviceId, deviceToken, osType).then(results => {
    response.response(null, true, res)
  })
}

module.exports = {
  pushToken: pushToken,
}
