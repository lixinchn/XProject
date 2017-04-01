function response(errorCode, info, res) {
  errorCode = errorCode || 0
  let content = { code: errorCode }
  if (errorCode)
    content.error = info
  else
    content.data = info
  res.json(content)
}

module.exports = {
  response: response,
}
