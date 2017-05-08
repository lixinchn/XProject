'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')


class PushTokenManager {
  constructor() {
    this.column = {
      device_id: 'deviceId',
      device_token: 'deviceToken',
      os_type: 'osType',
      ctime: 'ctime',
      uid: 'uid',
    }
    this.tableName = 'x_push_token'
  }

  async update(uid, deviceId, deviceToken, osType) {
    let sql = this.generateUpdate()
    let result = await this.saveToDB(sql, [deviceId, deviceToken, osType, uid, deviceId, deviceToken, uid])
    return true
  }

  saveToDB(sql, params) {
    return new Promise((resolve, reject) => {
      let pool = db.getPool()
      pool.query(sql, params, (error, results, fields) => {
        if (error) {
          console.log(error)
          reject(error)
          return
        }

        resolve(results)
      })
    })
  }

  generateUpdate() {
    return 'INSERT INTO ' + this.tableName + this.generateColumns() + 'VALUES(?, ?, ?, NOW(), ?)' +
            ' ON DUPLICATE KEY UPDATE ' +
            ' device_id = ?,' + ' device_token = ?,' + ' uid = ?;'
  }

  generateColumns() {
    let column = []
    Object.keys(this.column).forEach(key => {
        column.push(key)
    })

    column = column.join(',')
    return '(' + column + ') '
  }
}

exports.PushTokenManager = PushTokenManager
