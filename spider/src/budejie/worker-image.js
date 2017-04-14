'use strict'

const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
    this.src = 'http://www.budejie.com/pic/'
    this.type = conf.contentType.contentAndPic
  }

  getHref($, elem) {
    return $(elem).find('.j-r-list-c-desc').find('a').attr('href')
  }

  getContent($, elem) {
    return $(elem).find('.j-r-list-c-desc').find('a').html()
  }

  getImageSrc($, elem) {
    return $(elem).find('.j-r-list-c-img').find('img').attr('data-original')
  }

  begin(uri, callback) {
    const onFinish = $ => {
      let contents = []
      $('.j-r-list-c').each((index, elem) => {
        let href = this.getHref($, elem)
        let originalPage = this.originalUrlPrefix + href
        let id = this.getId(href)
        let content = this.getContent($, elem)
        let imageSrc = this.getImageSrc($, elem)
        let time = this.getTime($, elem)
        // let up = this.getUp($, elem)
        // let down = this.getDown($, elem)
        let up = this.getStandardUp()
        let down = this.getStandardDown()
        contents.push({
          originalPage: originalPage,
          id: id,
          content: content,
          imageSrc: imageSrc,
          time: time,
          up: up,
          down: down,
          type: content ? conf.contentType.contentAndPic : conf.contentType.pic,
        })
      })
      callback(contents)
    }

    const onError = err => {
      console.log(err)
      process.exit()
    }

    this.options.uri = uri
    this.beginCapture(this.options, onFinish, onError)
  }
}

exports.Worker = Worker
