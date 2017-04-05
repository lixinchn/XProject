const error = require('../util/error')
const response = require('../util/response')


function message(req, res) {
  const uid = req.query.uid
  const maxid = req.query.maxid

  if (error.paramErrorHandler([uid, maxid], res))
    return

  // TODO
  console.log(uid)
  console.log(maxid)

  response.response(null, '1111', res)
}

module.exports = {
  message: message,
}
