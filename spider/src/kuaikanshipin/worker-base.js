'use strict'
const rp = require('request-promise')
const cheerio = require('cheerio')
const spiderBase = require('../base/spider-base')
const conf = require('../conf')
const url = require('../util/url')


class WorkerBase extends spiderBase.SpiderBase {
  constructor(page) {
    super()
    this.originalUrlPrefix = conf.kuaikanshipin.originalUrlPrefix
    this.name = conf.kuaikanshipin.name
    this.maxTime = null
    this.page = 0
    this.options = {
      json: true,
      headers: {
        'User-Agent': conf.ua,
        'Host': conf.kuaikanshipin.host,
      },
      resolveWithFullResponse: true,
    }
    this.requestParams = {
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
  }

  setMaxTime(maxTime) {
    this.maxTime = maxTime
  }

  getSrc() {
    let realSrc = ''
    let newParams = { page: this.page++ }
    if (this.maxTime)
      newParams['maxtime'] = this.maxTime

    return this.src + url.joinParams(Object.assign({}, this.requestParams, newParams))
  }

  beginCapture(options, onFinish, onError) {
    rp(options).then(onFinish).catch(onError)
  }
}

exports.WorkerBase = WorkerBase
