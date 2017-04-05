const response = require('./response')

const errorInfo = {
  errorNo: {'code': 0, 'info': '' },
  errorParam: { 'code': 10000, 'info': '参数错误' },
}


function paramErrorHandler(params, res) {
  let error = params.some(param => {
    if (param === undefined || param === null)
      return true
  })

  if (error) {
    paramErrorResponse(res)
    return true
  }

  return false
}

function paramErrorResponse(res) {
  response.response(errorInfo.errorParam.code, errorInfo.errorParam.info, res)
}

module.exports = {
  paramErrorHandler: paramErrorHandler,
  paramErrorResponse: paramErrorResponse,
}
