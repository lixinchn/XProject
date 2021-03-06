'use strict'
const rp = require('request-promise')
const cheerio = require('cheerio')
const spiderBase = require('../base/spider-base')
const conf = require('../conf')


class WorkerBase extends spiderBase.SpiderBase {
  constructor() {
    super()
    this.originalUrlPrefix = conf.budejie.originalUrlPrefix
    this.name = conf.budejie.name
    this.page = 1
    this.options = {
      transform: body => {
        return cheerio.load(body, {
          decodeEntities: false,
        })
      },
    }
  }

  getId(href) {
    let hyphenIndex = href.indexOf('-')
    if (hyphenIndex === -1) {
      console.error('BUDEJIE: hyphenIndex hyphen error: %s', href)
      return
    }

    let dotIndex = href.indexOf('.')
    if (dotIndex === -1) {
      console.error('BUDEJIE: hyphenIndex dot error: %s', href)
      return
    }

    let id = href.substring(hyphenIndex + 1, dotIndex)
    return id
  }

  getTime($) {
    return $('.j-list-user').find('.u-time').html()
  }

  getUp($) {
    return parseInt($('.j-r-list-tool').find('.j-r-list-tool-l-up').find('span').html())
  }

  getDown($) {
    return parseInt($('.j-r-list-tool').find('.j-r-list-tool-l-down').find('span').html())
  }

  getSrc() {
    return this.src + (this.page++)
  }

  beginCapture(options, onFinish, onError) {
    rp(options).then(onFinish).catch(onError)
  }
}

exports.WorkerBase = WorkerBase
