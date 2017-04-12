'use strict'
const rp = require('request-promise')
const cheerio = require('cheerio')
const spiderBase = require('../base/spider-base')
const conf = require('../conf')


class WorkerBase extends spiderBase.SpiderBase {
  constructor(page) {
    super()
    this.originalUrlPrefix = conf.neihanshequ.originalUrlPrefix
    this.name = conf.neihanshequ.name
    this.minTime = null
    this.options = {
      json: true,
      headers: {
        'User-Agent': conf.ua,
        'Host': conf.neihanshequ.host,
        'Referer': conf.neihanshequ.refererImage,
        'Upgrade-Insecure-Requests': '1',
      },
      resolveWithFullResponse: true,
    }
  }

  setMinTime(minTime) {
    this.minTime = minTime
  }

  getSrc() {
    return !this.minTime ? this.src : (this.src + '&min_time=' + this.minTime)
  }

  beginCapture(options, onFinish, onError) {
    rp(options).then(onFinish).catch(onError)
  }

  setRequestCookie(headerCookies) {
    if (this.options.headers.Cookie)
      return
    if (!headerCookies || headerCookies.length === 0)
      return

    let cookies = []
    headerCookies.forEach(item => {
      let realCookie = item.substring(0, item.indexOf(';') + 1)
      cookies.push(realCookie)
    })

    this.options.headers.Cookie = cookies.join(' ')
  }

}

exports.WorkerBase = WorkerBase


/*
const textSrc = (() => {
  let src = 'http://m.neihanshequ.com/?is_json=1&app_name=neihanshequ_web&skip_guidence=1'
  let minTime = ''

  return {
    getTextSrc: () => {
      return !textSrc.minTime ? src : src + '&min_time=' + textSrc.minTime
    },

    setTextMinTime: minTime => {
      textSrc.minTime = minTime
    }
  }
})()

const imgSrc = (() => {
  let src = 'http://m.neihanshequ.com/pic/?is_json=1&skip_guidence=1&app_name=neihanshequ_web'
  let maxTime = ''

  return {
    getImageSrc: () => {
      return !imgSrc.maxTime ? src : src + '&max_time=' + imgSrc.maxTime
    },

    setImageMaxTime: maxTime => {
      imgSrc.maxTime = maxTime
    }
  }
})()

const videoSrc = (() => {
  let src = 'http://m.neihanshequ.com/video/?is_json=1&skip_guidence=1&app_name=neihanshequ_web'
  let maxTime = ''

  return {
    getVideoSrc: () => {
      return !videoSrc.maxTime ? src : src + '&max_time=' + videoSrc.maxTime
    },

    setVideoMaxTime: maxTime => {
      videoSrc.maxTime = maxTime
    }
  }
})()

function setRequestCookie(options, headerCookies) {
  if (options.headers.Cookie)
    return

  let cookies = []
  headerCookies.forEach(item => {
    let realCookie = item.substring(0, item.indexOf(';') + 1)
    cookies.push(realCookie)
  })

  options.headers.Cookie = cookies.join(' ')
}


module.exports = {
  getTextSrc: textSrc.getTextSrc,
  setTextMinTime: textSrc.setTextMinTime,
  getImageSrc: imgSrc.getImageSrc,
  setImageMaxTime: imgSrc.setImageMaxTime,
  getVideoSrc: videoSrc.getVideoSrc,
  setVideoMaxTime: videoSrc.setVideoMaxTime,
  setRequestCookie: setRequestCookie,
}
*/
