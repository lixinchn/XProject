const error = require('../util/error')
const response = require('../util/response')


function joke(req, res) {
  const uid = req.query.uid
  const type = req.query.type || 'hot' // 'hot' or 'new'
  const maxid = req.query.maxid
  const minid = req.query.minid

  if (error.paramErrorHandler([uid, type], res))
    return

  if ((maxid === undefined || maxid === null) && (minid === undefined || minid === null)) {
    error.paramErrorResponse(res)
    return
  }

  // TODO
  console.log(uid)
  console.log(type)

  response.response(null, '1111', res)
}

module.exports = {
  joke: joke,
}
