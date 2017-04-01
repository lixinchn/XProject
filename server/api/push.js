const error = require('../util/error')
const response = require('../util/response')


function pushToken(req, res) {
  const token = req.query.t
  const idfa = req.query.idfa

  if (error.paramErrorHandler([token, idfa], res))
    return

  // TODO
  console.log(token)
  console.log(idfa)

  response.response(null, '1111', res)
}

module.exports = {
  pushToken: pushToken,
}
