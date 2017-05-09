const error = require('../util/error')
const response = require('../util/response')
const Message = require('../model/message')


function message(req, res) {
  const deviceId = req.query.device_id
  const minId = req.query.min_id || 0
  const uid = req.query.uid

  if (error.paramErrorHandler([deviceId, uid, minId], res))
    return

  const message = new Message.Message()
  message.get(uid, deviceId, minId).then(results => {
    response.response(null, results, res)
  })
}

module.exports = {
  message: message,
}
