'use strict'
const spiderBase = require('../base/spider-base')


class WorkerBase extends spiderBase.SpiderBase {
  constructor(page) {
    super()
    this.page = page
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
    return this.src + this.page
  }

  /*

  const getVideoSrc = (() => {
    let page = 1
    let src = 'http://m.budejie.com/video/'

    return () => {
      return src + (page++)
    }
  })()
  */
}

exports.WorkerBase = WorkerBase
