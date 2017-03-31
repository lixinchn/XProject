const requestParams = {
  api: 5,
  appid: 7747,
  cb: '%E6%AE%B5%E5%AD%90',
  cmd: 'getlist',
  count: 15,
  f: 'gj',
  h: '7E865C9F-AB5C-4D1A-AF09-AA663673AC16',
  idfa: '9EF49E98-8A05-4AD0-90ED-9368C7B36036',
  machineType: 'iPhone%207%20Plus%20%28CDMA%29',
  mode: 'up',
  nt: 'wifi',
  pf: 'iOS',
  phone: 1,
  pkg: 'com.sogou.recnews',
  simplejson: 1,
  sys: 'iOS',
  t: 0,
  v: '1.6.3',
}

function getParams(newParams = []) {
  let params = []
  let allParams = Object.assign({}, requestParams, newParams)
  Object.keys(allParams).forEach(key => {
    params.push(key + '=' + allParams[key])
  })

  return params.join('&')
}

const imgSrc = (() => {
  let src = 'https://shida.epro.sogou.com/discover_agent/getlist?'
  let lastIndex = 0

  return {
    getImageSrc: () => {
      let realSrc = src + getParams()
      return !imgSrc.lastIndex ? realSrc : realSrc + '&lastindex=' + imgSrc.lastIndex
    },

    setLastIndex: lastIndex => {
      imgSrc.lastIndex = lastIndex
    }
  }
})()

const gifSrc = (() => {
  let src = 'https://shida.epro.sogou.com/discover_agent/getlist?'
  let lastIndex = 0

  return {
    getGifSrc: () => {
      let newParams = { b: 'GIF'}
      let realSrc = src + getParams(newParams)
      return !gifSrc.lastIndex ? realSrc : realSrc + '&lastindex=' + gifSrc.lastIndex
    },

    setLastIndex: lastIndex => {
      gifSrc.lastIndex = lastIndex
    }
  }
})()


module.exports = {
  getImageSrc: imgSrc.getImageSrc,
  setImageLastIndex: imgSrc.setLastIndex,
  getGifSrc: gifSrc.getGifSrc,
  setGifLastIndex: gifSrc.setLastIndex,
}
