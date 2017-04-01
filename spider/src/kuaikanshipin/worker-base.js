const url = require('../util/url')

const requestParams = {
  a: 'list',
  appname: 'nhjx',
  c: 'video',
  client: 'iphone',
  from: 'ios',
  green: 1,
  per: 20,
  sub_flag: 1,
  type: 41,
  ver: '1.0',
}

const videoSrc = (() => {
  let src = 'http://api.winapp111.com/api/api_open.php?'
  let page = 0
  let maxtime = 0

  return {
    getVideoSrc: () => {
      let newParams = { page: page++ }
      if (videoSrc.maxtime)
        newParams['maxtime'] = videoSrc.maxtime

      return src + url.joinParams(Object.assign({}, requestParams, newParams))
    },

    setVideoMaxtime: maxtime => {
      videoSrc.maxtime = maxtime
    }
  }
})()

module.exports = {
  getVideoSrc: videoSrc.getVideoSrc,
  setVideoMaxtime: videoSrc.setVideoMaxtime,
}
