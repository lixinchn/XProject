'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')
const storage = require('../util/storage')


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
    let results = await storage.getFromCache(conf.redisKey._MSG_PUBLIC_)

    // db
    if (!results) {
      let sql = this.generateLatest100Sql()
      results = await storage.getFromDb(sql, null)

      // save to cache
      if (results)
        await storage.saveToCache(conf.redisKey._MSG_PUBLIC_, JSON.stringify(results))
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
    let results = await storage.getFromCache(this.generateLongAgoCacheKey(minId))
    if (results)
      return results

    // db
    let sql = storage.generateSelect(this.column, this.tableName) +
              this.generateWhere(minId, 'min') + storage.generateOrderBy(this.idColumn)
                + storage.generateLimit(this.pageCount)
    results = await storage.getFromDb(sql, [minId])
    if (!results)
      return ''

    // save to cache
    let saveSucc = await storage.saveToCache(this.generateLongAgoCacheKey(minId), JSON.stringify(results))
    return results
  }

  generateLongAgoCacheKey(minId) {
    return conf.redisKey._MSG_PUBLIC_LONG_AGO_ + minId
  }

  generateLatest100Sql() {
    return storage.generateSelect(this.column, this.tableName) +
            storage.generateOrderBy(this.idColumn) + storage.generateLimit(100)
  }

  generateWhere(id, maxOrMin) {
    if (!id)
        return ''
    return ' WHERE ' + this.idColumn + (maxOrMin === 'max' ? ' > ? ' : ' < ? ')
  }
}

exports.Message = Message
