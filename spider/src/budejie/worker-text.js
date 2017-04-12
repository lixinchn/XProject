'use strict'

const rp = require('request-promise')
const cheerio = require('cheerio')
const workerBase = require('./worker-base')


class Worker extends workerBase.WorkerBase {
  constructor(page) {
    super(page)
    this.src = 'http://www.budejie.com/text/'
    this.options = {
      transform: body => {
        return cheerio.load(body, {
          decodeEntities: false,
        })
      },
    }
  }

  getHref($, elem) {
    return $(elem).find('a').attr('href')
  }

  getContent($, elem) {
    return $(elem).find('a').html()
  }

  begin(uri, callback) {
    this.options.uri = uri
    rp(this.options)
      .then($ => {
        let contents = []
        $('.j-r-list-c-desc').each((index, elem) => {
          let href = this.getHref($, elem)
          let id = this.getId(href)
          let content = this.getContent($, elem)
          let time = this.getTime($, elem)
          let up = this.getUp($, elem)
          let down = this.getDown($, elem)
          contents.push({
            href: href,
            id: id,
            content: content,
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
