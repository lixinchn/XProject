const metaConf = require('../meta-conf')
const redis = require('redis')


let client = redis.createClient({
  host: metaConf.redis.host,
  port: metaConf.redis.port,
  password: metaConf.redis.password,
})

client.on('message', (channel, message) => {
  console.log('sub channel ' + channel + ': ' + message)
})

client.subscribe('push')
