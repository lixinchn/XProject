const error = require('../util/error')
const response = require('../util/response')
const Joke = require('../model/joke')


function joke(req, res) {
  const uid = req.query.uid
  const type = req.query.type || 'hot' // 'hot' or 'new'
  const maxId = req.query.maxid || 0
  const minId = req.query.minid || 0

  if (error.paramErrorHandler([uid, type], res))
    return

  const joke = new Joke.Joke()
  joke.get(maxId, minId).then(results => {
    response.response(null, results, res)
  })
}

module.exports = {
  joke: joke,
}
