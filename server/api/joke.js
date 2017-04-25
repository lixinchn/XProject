const error = require('../util/error')
const response = require('../util/response')
const jokeManager = require('../model/joke-manager')


function joke(req, res) {
  const uid = req.query.uid
  const type = req.query.type || 'hot' // 'hot' or 'new'
  const maxId = req.query.maxid
  const minId = req.query.minid

  if (error.paramErrorHandler([uid, type], res))
    return

  if ((maxId === undefined || maxId === null) && (minId === undefined || minId === null)) {
    error.paramErrorResponse(res)
    return
  }

  const manager = new jokeManager.JokeManager()
  manager.get(maxId, minId).then(results => {
    console.log(results)
    response.response(null, results, res)
  })
}

module.exports = {
  joke: joke,
}
