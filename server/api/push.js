const error = require('../util/error')
const response = require('../util/response')
const Push = require('../model/push-token')


async function pushToken(req, res) {
  const deviceToken = req.query.device_token
  const deviceId = req.query.device_id
  const uid = req.query.uid
  const osType = req.query.os

  if (error.paramErrorHandler([deviceToken, deviceId, osType], res))
    return

  if (error.paramOsErrorHandler(osType, res))
    return

  const push = new Push.PushToken()
  let results = await push.update(uid, deviceId, deviceToken, osType)
  response.response(null, true, res)
}

module.exports = {
  pushToken: pushToken,
}
