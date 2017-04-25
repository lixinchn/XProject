'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')


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
    // cache
    let results = await this.getFromCache()
    // results = JSON.parse(results)

    // db
    if (!results)
      results = await this.getFromDb()

    if (!results)
      return ''

    // save to cache
    let saveSucc = await this.saveToCache(results)

    let returnContents = this.filter(results, maxId, minId)
    return returnContents
  }

  getFromCache(maxId, minId) {
    return new Promise((resolve, reject) => {
      let client = redis.getClient()
      client.get(conf.redisKey._JOKE_HOT_, (err, reply) => {
        if (err) {
          reject(err)
          return
        }

        resolve(JSON.parse(reply))
      })
    })
  }

  saveToCache(results) {
    let str = JSON.stringify(results)
    return new Promise((resolve, reject) => {
      let client = redis.getClient()
      client.setex(conf.redisKey._JOKE_HOT_, conf.ttl.FIVE_MINS, str, (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        resolve(reply)
      })
    })
  }

  getFromDb() {
    let sql = this.generateLatest1000Sql()
    return new Promise((resolve, reject) => {
      let pool = db.getPool()
      pool.query(sql, (error, results, fields) => {
        if (error) {
          reject(error)
          return
        }

        resolve(results)
      })
    })
  }

  filter(results, maxId, minId) {
    let contents = []
    for (let result of results) {
      if (contents.length >= this.pageCount)
        break

      if (!maxId && !minId) {
        contents.push(result)
        continue
      }

      if (maxId && result.id > maxId) {
        contents.push(result)
        continue
      }

      console.log(result.id)
      console.log(minId)
      if (minId && result.id < minId) {
        contents.push(result)
        continue
      }
    }
    return contents
  }

  generateLatest1000Sql() {
    return this.generateSelect() + this.generateOrderBy() + this.generateLimit(1000)
  }

  // generateSqlById(id, maxOrMin, limit) {
  //   return this.generateSelect() + this.generateWhere(id, maxOrMin) + this.generateOrderBy() + this.generateLimit(limit)
  // }

  generateSelect() {
    let column = []
    Object.keys(this.column).forEach(key => {
        column.push(key + ' AS ' + this.column[key])
    })

    column = column.join(',')
    return 'SELECT ' + column + ' FROM ' + this.tableName
  }

  // generateWhere(id, maxOrMin) {
  //   if (!id)
  //       return ''
  //   return ' WHERE ' + this.idColumn + (maxOrMin === 'max' ? ' > ? ' : ' < ? ')
  // }

  generateOrderBy() {
    return ' ORDER BY ' + this.idColumn + ' DESC '
  }

  generateLimit(limit) {
    return ' LIMIT ' + limit
  }
}

exports.JokeManager = JokeManager
