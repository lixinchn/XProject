'use strict'

const rp = require('request-promise')
const cheerio = require('cheerio')
const workerBase = require('./worker-base')


class Worker extends workerBase.WorkerBase {
  constructor(page) {
    super(page)
    this.src = 'http://www.budejie.com/pic/'
    this.options = {
      transform: body => {
        return cheerio.load(body, {
          decodeEntities: false,
        })
      },
    }
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
    this.options.uri = uri
    rp(this.options)
      .then($ => {
        let contents = []
        $('.j-r-list-c').each((index, elem) => {
          let href = this.getHref($, elem)
          let id = this.getId(href)
          let content = this.getContent($, elem)
          let imageSrc = this.getImageSrc($, elem)
          let time = this.getTime($, elem)
          let up = this.getUp($, elem)
          let down = this.getDown($, elem)
          contents.push({
            href: href,
            id: id,
            content: content,
            imageSrc: imageSrc,
            time: time,
            up: up,
            down: down,
          })
        })

        callback(contents)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

exports.Worker = Worker
