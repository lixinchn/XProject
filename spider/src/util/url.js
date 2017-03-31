function joinParams(jsonParams) {
  let params = []
  Object.keys(jsonParams).forEach(key => {
    params.push(key + '=' + jsonParams[key])
  })

  return params.join('&')
}

module.exports = {
  joinParams: joinParams,
}
