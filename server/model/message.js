'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')


class Message {
  constructor() {
    this.column = {
      id: 'id',
      msg_title: 'msgTitle',
      msg_content: 'msgContent',
      ctime: 'ctime',
    }
    this.tableName = 'x_msg_public'
    this.idColumn = 'id'
    this.pageCount = 10
  }

  async get(uid, deviceId, minId) {
    // cache
    let results = await this.getFromCache(conf.redisKey._MSG_PUBLIC_)

    // db
    if (!results) {
      let sql = this.generateLatest100Sql()
      results = await this.getFromDb(sql, null)

      // save to cache
      if (results)
        await this.saveToCache(conf.redisKey._MSG_PUBLIC_, results)
    }


    // filter
    let returnContents = null
    if (results)
      returnContents = this.filter(results, minId)

    if (!returnContents || returnContents.length === 0)
        returnContents = await Promise.resolve(this.getContentsLongAgo(minId)).catch(err => {
          console.log(err)
        })
    return returnContents
  }

  getFromCache(cacheKey) {
    return new Promise((resolve, reject) => {
      let client = redis.getClient()
      client.get(cacheKey, (err, reply) => {
        if (err) {
          reject(err)
          return
        }

        resolve(JSON.parse(reply))
      })
    })
  }

  saveToCache(cacheKey, results) {
    let str = JSON.stringify(results)
    return new Promise((resolve, reject) => {
      let client = redis.getClient()
      client.setex(cacheKey, conf.ttl.FIVE_MINS, str, (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        resolve(reply)
      })
    })
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

  filter(results, minId) {
    let contents = []
    for (let result of results) {
      if (contents.length >= this.pageCount)
        break

      if (!minId) {
        contents.push(result)
        continue
      }

      if (result.id < minId) {
        contents.push(result)
        continue
      }
    }
    return contents
  }

  async getContentsLongAgo(minId) {
    // cache
    let results = await this.getFromCache(this.generateLongAgoCacheKey(minId))
    if (results)
      return results

    // db
    let sql = this.generateSelect() + this.generateWhere(minId, 'min') + this.generateOrderBy()
                + this.generateLimit(this.pageCount)
    results = await this.getFromDb(sql, minId)
    if (!results)
      return ''

    // save to cache
    let saveSucc = await this.saveToCache(this.generateLongAgoCacheKey(minId), results)
    return results
  }

  generateLongAgoCacheKey(minId) {
    return conf.redisKey._MSG_PUBLIC_LONG_AGO_ + minId
  }

  generateLatest100Sql() {
    return this.generateSelect() + this.generateOrderBy() + this.generateLimit(100)
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

exports.Message = Message
