const error = require('../util/error')
const response = require('../util/response')
const Init = require('../model/init')


async function init(req, res) {
  const uid = req.query.uid
  const deviceId = req.query.device_id
  const appVersion = req.query.app_version
  const osType = req.query.os
  const maxMsgId = req.query.max_msg_id || 0

  if (error.paramErrorHandler([deviceId, appVersion, osType], res))
    return

  const init = new Init.Init()
  let results = await init.do(uid, deviceId, appVersion, osType, maxMsgId)
  response.response(null, results, res)
}

module.exports = {
  init: init,
}
