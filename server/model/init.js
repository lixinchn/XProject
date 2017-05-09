'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')
const Version = require('./version')


class Init {
  constructor() {
  }

  async do(uid, deviceId, appVersion, osType) {
    let needUpdate = await Promise.resolve(this.checkUpdate(appVersion, osType))
    return {
      needUpdate: needUpdate,
    }
  }

  async checkUpdate(appVersion, osType) {
    let version = new Version.Version()
    let needUpdate = await Promise.resolve(version.checkUpdate(appVersion, osType))
    return needUpdate
  }
}

exports.Init = Init
