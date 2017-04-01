const express = require('express')
const app = express()
const router = require('./router')


function getMethod(method) {
  if (method === 'GET')
    return app.get
  if (method === 'POST')
    return app.post
  if (method === 'PUT')
    return app.put
  if (method === 'DELETE')
    return app.delete
  return app.get
}

router.routers.forEach(r => {
  const method = getMethod(r.method)
  method.call(app, r.path, r.handler)
})

const server = app.listen(8888, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('host: %s,  port: %s', host, port)
})
