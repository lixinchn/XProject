'use strict'
const db = require('../util/db')
const mysql = require('mysql')


class Joke {
  constructor(id) {
    this.id = id
    this.data = null
  }

  async get() {
    if (this.data)
      return this.data

    // redis
    // this.data = await this.getFromRedis()
    // if (this.data)
    //   return this.data

    // db
    this.data = await this.getFromDB()
    return this.data
  }

  getFromRedis() {
    // TODO
  }

  getFromDB() {
    let sql = db.generateSql.getById(this.column, this.tableName, this.idColumn)
    return new Promise((resolve, reject) => {
      pool.query(sql, originalId, (error, results, fields) => {
        if (error) {
          reject(error)
          return
        }
        console.log(results)
        resolve(results)
      })
    })
  }

  makeQuerySql() {
    let column = this.column.join(',')
    return 'SELECT ' + column + ' FROM '
  }
}

exports.Joke = Joke
