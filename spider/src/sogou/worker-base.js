'use strict'
const rp = require('request-promise')
const cheerio = require('cheerio')
const spiderBase = require('../base/spider-base')
const conf = require('../conf')
const url = require('../util/url')


class WorkerBase extends spiderBase.SpiderBase {
  constructor(page) {
    super()
    this.name = conf.sogou.name
    this.lastIndex = 0
    this.options = {
      json: true,
      headers: {
        'User-Agent': conf.sogou.ua,
        'Host': conf.sogou.host,
      },
      resolveWithFullResponse: true,
    }
    this.requestParams = {
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
  }

  setLastIndex(lastIndex) {
    this.lastIndex = lastIndex
  }

  getSrc() {
    let realSrc = ''
    if (!this.newParams)
      realSrc = this.src + url.joinParams(this.requestParams)
    else
      realSrc = this.src + url.joinParams(Object.assign({}, this.requestParams, this.newParams))
    return !this.lastIndex ? realSrc : realSrc + '&lastindex=' + this.lastIndex
  }

  beginCapture(options, onFinish, onError) {
    rp(options).then(onFinish).catch(onError)
  }
}

exports.WorkerBase = WorkerBase
