'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')
const storage = require('../util/storage')


class Version {
  constructor() {
    this.column = {
      id: 'id',
      version: 'version',
      os_type: 'osType',
      instruction: 'instruction',
    }
    this.tableName = 'x_app_version'
    this.idColumn = 'id'
    this.osTypeColumn = 'os_type'
  }

  async checkUpdate(appVersion, osType) {
    let recentVersion = await Promise.resolve(this.getFromCache(osType))
    if (recentVersion) {
      if (recentVersion > appVersion)
        return true
      return false
    }

    recentVersion = await Promise.resolve(this.getFromDb(osType))
    if (recentVersion) {
      await Promise.resolve(this.saveToCache(osType, recentVersion))
      if (recentVersion > appVersion)
        return true
    }
    return false
  }

  async getFromCache(osType) {
    let recentVersion = await storage.getFromCache(this.generateCacheKey(osType))
    return recentVersion
  }

  async getFromDb(osType) {
    let sql = storage.generateSelect(this.column, this.tableName) +
              this.generateWhere(osType) +
              storage.generateOrderBy(this.idColumn) + storage.generateLimit(1)
    let recentVersion = await storage.getFromDb(sql, [osType])
    return recentVersion
  }

  async saveToCache(osType, recentVersion) {
    let cacheKey = this.generateCacheKey(osType)
    let saveResult = await storage.saveToCache(cacheKey, JSON.stringify(recentVersion))
    return saveResult
  }

  generateWhere() {
    return ' WHERE ' + this.osTypeColumn + ' = ? '
  }

  generateCacheKey(osType) {
    return conf.redisKey._APP_VERSION_ + osType
  }
}

exports.Version = Version
