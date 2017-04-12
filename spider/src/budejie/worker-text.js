'use strict'

const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor(page) {
    super(page)
    this.src = 'http://www.budejie.com/text/'
    this.type = conf.contentType.content
  }

  getHref($, elem) {
    return $(elem).find('a').attr('href')
  }

  getContent($, elem) {
    return $(elem).find('a').html()
  }

  begin(uri, callback) {
    const onFinish = $ => {
      let contents = []
      $('.j-r-list-c-desc').each((index, elem) => {
        let href = this.getHref($, elem)
        let originalPage = this.originalUrlPrefix + href
        let id = this.getId(href)
        let content = this.getContent($, elem)
        let time = this.getTime($, elem)
        let up = this.getUp($, elem)
        let down = this.getDown($, elem)
        contents.push({
          originalPage: originalPage,
          id: id,
          content: content,
          time: time,
          up: up,
          down: down,
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
