const error = require('../util/error')
const response = require('../util/response')
const Joke = require('../model/joke')


async function joke(req, res) {
  const uid = req.query.uid
  const type = req.query.type || 'hot' // 'hot' or 'new'
  const maxId = req.query.maxid || 0
  const minId = req.query.minid || 0

  if (error.paramErrorHandler([uid, type], res))
    return

  const joke = new Joke.Joke()
  let results = await joke.get(maxId, minId)
  response.response(null, results, res)
}

module.exports = {
  joke: joke,
}
