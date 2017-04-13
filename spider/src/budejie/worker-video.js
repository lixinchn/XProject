'use strict'

const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
    this.src = 'http://m.budejie.com/video/'
  }

  getContent($, elem) {
    let content = $(elem).find('section.ui-row-flex').find('p').html()
    content = content.trim('\n')
    content = content.trim()
    return content
  }

  getId($, elem) {
    return $(elem).find('.j-v-c').find('video').attr('data-id')
  }

  getImageSrc($, elem) {
    return $(elem).find('.j-v-c').find('video').attr('poster')
  }

  getVideoSrc($, elem) {
    return $(elem).find('.j-v-c').find('source').attr('src')
  }

  getTime($, elem) {
    return $(elem).find('.ui-list-info').find('p').html()
  }

  getUp($, elem) {
    return parseInt($(elem).find('.tool-praise').find('span').html())
  }

  getDown($, elem) {
    return parseInt($(elem).find('.tool-cai').find('span').html())
  }

  begin(uri, callback) {
    const onFinish = $ => {
      let contents = []
      $('.ui-border-b').each((index, elem) => {
        let id = this.getId($, elem)
        if (!id)
          return // ad
        let content = this.getContent($, elem)
        let imageSrc = this.getImageSrc($, elem)
        let videoSrc = this.getVideoSrc($, elem)
        let time = this.getTime($, elem)
        let up = this.getUp($, elem)
        let down = this.getDown($, elem)
        contents.push({
          id: id,
          content: content,
          imageSrc: imageSrc,
          videoSrc: videoSrc,
          time: time,
          up: up,
          down: down,
          type: conf.contentType.contentAndPic,
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
