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
