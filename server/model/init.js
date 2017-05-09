'use strict'
const db = require('../util/db')
const redis = require('../util/redis')
const conf = require('../util/conf')
const Version = require('./version')
const Message = require('./message')


class Init {
  constructor() {
  }

  async do(uid, deviceId, appVersion, osType, maxMsgId) {
    let needUpdate = await Promise.resolve(this.checkUpdate(appVersion, osType))
    let newMsg = await Promise.resolve(this.checkNewMsg(maxMsgId))
    return {
      needUpdate: needUpdate,
      newMsg: newMsg,
    }
  }

  async checkUpdate(appVersion, osType) {
    let version = new Version.Version()
    let needUpdate = await Promise.resolve(version.checkUpdate(appVersion, osType))
    return needUpdate
  }

  async checkNewMsg(maxMsgId) {
    if (!maxMsgId)
      return false
    const message = new Message.Message()
    let results = await Promise.resolve(message.get(uid, deviceId, minId))
    if (!results || results.length === 0 || results[0].id <= maxMsgId)
      return false
    return true
  }
}

exports.Init = Init
