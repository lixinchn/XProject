'use strict'
const db = require('../util/db')


class JokeManager {
  constructor() {
    // this.column = ['id', 'source', 'original_id', 'text_content', 'image_src', 'original_date',
    //               'up', 'down', 'original_page', 'type', 'ctime']
    this.column = {
      id: 'id',
      text_content: 'content',
      image_src: 'image',
      original_date: 'date',
      up: 'up',
      down: 'down',
      original_page: 'page',
      type: 'type',
    }
    this.tableName = 'x_t_joke'
    this.idColumn = 'id'
    this.pageCount = 20
  }

  async get(maxId, minId) {
    let sql = this.generateSqlById(maxId, 'max', this.pageCount)
    let results = await this.getFromDb(sql, maxId)
    if (results.length < this.pageCount && minId) {
        let sql = this.generateSqlById(minId, 'min', this.pageCount - results.length)
        let newResults = await this.getFromDb(sql, minId)
        results.push(...newResults)
    }
    return results
  }

  getFromDb(sql, params) {
    return new Promise((resolve, reject) => {
      let pool = db.getPool()
      pool.query(sql, params, (error, results, fields) => {
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      })
    })
  }

  generateSqlById(id, maxOrMin, limit) {
    return this.generateSelect() + this.generateWhere(id, maxOrMin) + this.generateOrderBy() + this.generateLimit(limit)
  }

  generateSelect() {
    let column = []
    Object.keys(this.column).forEach(key => {
        column.push(key + ' AS ' + this.column[key])
    })

    column = column.join(',')
    return 'SELECT ' + column + ' FROM ' + this.tableName
  }

  generateWhere(id, maxOrMin) {
    if (!id)
        return ''
    return ' WHERE ' + this.idColumn + (maxOrMin === 'max' ? ' > ? ' : ' < ? ')
  }

  generateOrderBy() {
    return ' ORDER BY ' + this.idColumn + ' DESC '
  }

  generateLimit(limit) {
    return ' LIMIT ' + limit
  }
}

exports.JokeManager = JokeManager
