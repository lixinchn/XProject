'use strict'

const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
    this.src = 'http://m.neihanshequ.com/pic/?is_json=1&skip_guidence=1&app_name=neihanshequ_web'
  }

  begin(uri, callback) {
    const onFinish = response => {
      // 内涵社区只有设置了cookie才可以实现分页获取数据
      this.setRequestCookie(response.headers['set-cookie'])

      // get contents
      let contents = []
      let minTime = response.body.data.min_time
      response.body.data.data.forEach(data => {
        let group = data.group
        let content = group.content
        let id = group.id
        let imageSrc = group.large_image.url_list[0].url
        let imageMiddleSrc = group.middle_image.url_list[0].url
        let up = parseInt(group.digg_count)
        let down = parseInt(group.bury_count)
        let onlineTime = group.online_time
        let time = moment(onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        let originalPage = group.share_url
        contents.push({
          id: id,
          content: content,
          imageSrc: imageSrc,
          imageMiddleSrc: imageMiddleSrc,
          up: up,
          down: down,
          time: time,
          originalPage: originalPage,
          type: content ? conf.contentType.contentAndPic : conf.contentType.pic,
        })
      })

      callback(minTime, contents)
    }

    const onError = err => {
      console.log(err)
      process.exit()
    }

    this.options.uri = uri
    this.beginCapture(this.options, onFinish, onError)
  }
}

exports.Worker = Worker
