const url = require('../util/url')

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


const imgSrc = (() => {
  let src = 'https://shida.epro.sogou.com/discover_agent/getlist?'
  let lastIndex = 0

  return {
    getImageSrc: () => {
      let realSrc = src + url.joinParams(requestParams)
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
      let newParams = { b: 'GIF' }
      let realSrc = src + url.joinParams(Object.assign({}, requestParams, newParams))
      return !gifSrc.lastIndex ? realSrc : realSrc + '&lastindex=' + gifSrc.lastIndex
    },

    setLastIndex: lastIndex => {
      gifSrc.lastIndex = lastIndex
    }
  }
})()

const videoSrc = (() => {
  let src = 'https://shida.epro.sogou.com/discover_agent/getlist?'
  let lastIndex = 0

  return {
    getVideoSrc: () => {
      let newParams = { b: '%E5%A4%A7%E5%9B%BE%E8%A7%86%E9%A2%91' }
      let realSrc = src + url.joinParams(Object.assign({}, requestParams, newParams))
      return !videoSrc.lastIndex ? realSrc : realSrc + '&lastindex=' + videoSrc.lastIndex
    },

    setVideoLastIndex: lastIndex => {
      videoSrc.lastIndex = lastIndex
    }
  }
})()

module.exports = {
  getImageSrc: imgSrc.getImageSrc,
  setImageLastIndex: imgSrc.setLastIndex,
  getGifSrc: gifSrc.getGifSrc,
  setGifLastIndex: gifSrc.setLastIndex,
  getVideoSrc: videoSrc.getVideoSrc,
  setVideoLastIndex: videoSrc.setVideoLastIndex,
}
