'use strict'

const rp = require('request-promise')
const cheerio = require('cheerio')
const db = require('../db')
const conf = require('../conf')
const workerBase = require('./worker-base')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
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

  getSrc() {
    return this.src + (this.page++)
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

  async saveContent(contents) {
    let pool = db.getPool()
    let errorCount = 0
    console.log('save begin')

    for (let content of contents) {
      let params = this.makeParams(content)
      try {
        let results = await this.insert(pool, params)
        console.log(results)
      } catch(e) {
        // console.log(e)
        ++errorCount
        console.log(errorCount)
      }
    }
    console.log('save end')
    return errorCount
  }

  insert(pool, params) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO x_t_joke(source, original_id, text_content, original_date, \
        up, down, original_page, type) VALUES(?, ?, ?, ?, ?, ?, ?, ?);', params,
        (error, results, fields) => {
          if (error)
            reject(error)
          resolve(results)
        })
    })
  }

  makeParams(content) {
    let params = [
      conf.budejie.name,
      conf.budejie.name + '_' + content.id,
      content.content,
      content.time,
      content.up,
      content.down,
      conf.budejie.originalUrlPrefix + content.href,
      conf.contentType.content,
    ]
    return params
  }
}

exports.Worker = Worker
