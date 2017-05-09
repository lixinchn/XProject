'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')
const storage = require('../util/storage')


class Joke {
  constructor() {
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
    let results = await storage.getFromCache(conf.redisKey._JOKE_HOT_)

    // db
    if (!results) {
      let sql = this.generateLatest1000Sql()
      results = await storage.getFromDb(sql, null)

      // save to cache
      if (results)
        await storage.saveToCache(conf.redisKey._JOKE_HOT_, JSON.stringify(results))
    }

    // filter
    let returnContents = null
    if (results)
      returnContents = this.filter(results, maxId, minId)

    if (!returnContents || returnContents.length === 0)
        returnContents = await Promise.resolve(this.getContentsLongAgo(minId)).catch(err => {
          console.log(err)
        })
    return returnContents
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

      if (minId && result.id < minId) {
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
              this.generateWhere(minId, 'min') + storage.generateOrderBy(this.idColumn) +
              storage.generateLimit(this.pageCount)
    results = await storage.getFromDb(sql, [minId])
    if (!results)
      return ''

    // save to cache
    let saveSucc = await storage.saveToCache(this.generateLongAgoCacheKey(minId), JSON.stringify(results))
    return results
  }

  generateLongAgoCacheKey(minId) {
    return conf.redisKey._JOKE_HOT_LONG_AGO_ + minId
  }

  generateLatest1000Sql() {
    return storage.generateSelect(this.column, this.tableName) +
            storage.generateOrderBy(this.idColumn) + storage.generateLimit(1000)
  }

  generateWhere(id, maxOrMin) {
    if (!id)
        return ''
    return ' WHERE ' + this.idColumn + (maxOrMin === 'max' ? ' > ? ' : ' < ? ')
  }
}

exports.Joke = Joke
