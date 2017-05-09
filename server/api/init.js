const error = require('../util/error')
const response = require('../util/response')
const Init = require('../model/init')


function init(req, res) {
  const uid = req.query.uid
  const deviceId = req.query.device_id
  const appVersion = req.query.app_version
  const osType = req.query.os

  if (error.paramErrorHandler([deviceId, appVersion, osType], res))
    return

  const init = new Init.Init()
  init.do(uid, deviceId, appVersion, osType).then(results => {
    response.response(null, results, res)
  })
}

module.exports = {
  init: init,
}
