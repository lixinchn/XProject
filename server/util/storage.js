'use strict'
const db = require('./db')
const redis = require('./redis')
const conf = require('./conf')


let storage = {
  generateSelect: (objColumn, tableName) => {
    let column = []
    Object.keys(objColumn).forEach(key => {
        column.push(key + ' AS ' + objColumn[key])
    })

    column = column.join(',')
    return 'SELECT ' + column + ' FROM ' + tableName
  },

  generateOrderBy: (column) => {
    return ' ORDER BY ' + column + ' DESC '
  },

  generateLimit: (limit) => {
    return ' LIMIT ' + limit
  },

  getFromCache: (cacheKey) => {
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
  },

  getFromDb: (sql, params) => {
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
  },

  saveToCache: (cacheKey, results, expire = conf.ttl.FIVE_MINS) => {
    return new Promise((resolve, reject) => {
      let client = redis.getClient()
      client.setex(cacheKey, expire, results, (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        resolve(reply)
      })
    })
  },
}

module.exports = {
  generateSelect: storage.generateSelect,
  generateOrderBy: storage.generateOrderBy,
  generateLimit: storage.generateLimit,
  getFromCache: storage.getFromCache,
  getFromDb: storage.getFromDb,
  saveToCache: storage.saveToCache,
}
