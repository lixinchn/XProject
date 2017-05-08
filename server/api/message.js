const error = require('../util/error')
const response = require('../util/response')
const messageManager = require('../model/message-manager')


function message(req, res) {
  const deviceId = req.query.device_id
  const minId = req.query.min_id || 0
  const uid = req.query.uid

  if (error.paramErrorHandler([deviceId, uid, minId], res))
    return

  const manager = new messageManager.MessageManager()
  manager.get(uid, deviceId, minId).then(results => {
    response.response(null, results, res)
  })
}

function messageAlert(req, res) {
  const deviceId = req.query.device_id
  const minId = req.query.min_id
  const uid = req.query.uid || deviceId

  if (error.paramErrorHandler([deviceId, uid, minId], res))
    return

  // TODO
  // TODO
  console.log(deviceId)
  console.log(uid)
  console.log(minId)

  response.response(null, '1111', res)
}

module.exports = {
  message: message,
  messageAlert: messageAlert,
}
