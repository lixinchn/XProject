const metaConf = require('../../meta-conf')
const redis = require('redis')


let worker = {
  client: null,

  getClient: () => {
    if (worker.client) {
      console.log('in redis client')
      return worker.client
    }

    worker.client = redis.createClient({
      host: metaConf.redis.host,
      port: metaConf.redis.port,
      password: metaConf.redis.password,
    })
    return worker.client
  },

  endClient: () => {
    if (worker.client)
      worker.client.quit()
  }
}

module.exports = {
  getClient: worker.getClient,
  endClient: worker.endClient,
}
