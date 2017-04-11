'use strict'


class WorkerBase {
  constructor() {
    this.page = 1
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

  /*
  const getImageSrc = (() => {
    let page = 1
    let src = 'http://www.budejie.com/pic/'

    return () => {
      return src + (page++)
    }
  })()

  const getVideoSrc = (() => {
    let page = 1
    let src = 'http://m.budejie.com/video/'

    return () => {
      return src + (page++)
    }
  })()
  */
}

/*
module.exports = {
  getId: getId,
  getTextSrc: getTextSrc,
  getImageSrc: getImageSrc,
  getVideoSrc: getVideoSrc,
  getTime: getTime,
  getUp: getUp,
  getDown: getDown,
}
*/
exports.WorkerBase = WorkerBase
