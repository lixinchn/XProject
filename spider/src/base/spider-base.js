'use strict'
const db = require('../db')


class SpiderBase {
  constructor() {}

  async saveContent(contents, type, src) {
    let pool = db.getPool()
    let errorCount = 0

    for (let content of contents) {
      let params = this.makeParams(content, type)
      let originalId = this.getOriginalId(content)
      try {
        let results = await this.insert(pool, params, originalId, src)
        console.log(results)
      } catch(e) {
        console.log(e)
        ++errorCount
        // console.log(errorCount)
      }
    }
    return errorCount
  }

  insert(pool, params, originalId, src) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT id FROM x_t_joke WHERE original_id = ?;', originalId,
        (error, results, fields) => {
          if (error) {
            reject(error)
            return
          }
          if (results.length > 0) { // 说明抓取的是重复的内容，直接返回
            reject('重复的内容, src: ' + src + ', originalId: ' + originalId)
            return
          }

          pool.query('INSERT INTO x_t_joke(source, original_id, text_content, image_src, \
          original_date, up, down, original_page, type, ctime) VALUES(?, ?, ?, ?, ?, \
          ?, ?, ?, ?, NOW());', params,
          (error, results, fields) => {
            if (error)
              reject(error)
            resolve(results)
          })
        })
    })
  }

  makeParams(content, type) {
    let params = [
      this.name,
      this.getOriginalId(content),
      content.content,
      content.imageSrc || null,
      content.time,
      content.up,
      content.down,
      this.originalUrlPrefix + content.href,
      type,
    ]
    return params
  }

  getOriginalId(content) {
    return this.name + '_' + content.id
  }
}

exports.SpiderBase = SpiderBase
