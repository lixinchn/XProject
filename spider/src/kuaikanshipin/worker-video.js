'use strict'

const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
    this.src = 'http://api.winapp111.com/api/api_open.php?'
  }

  begin(uri, callback) {
    const onFinish = response => {
      // get contents
      let contents = []
      let maxTime = response.body.info.maxtime
      response.body.list.forEach(data => {
        let id = data.id
        let content = data.text
        let time = data.created_at
        let imageSrc = data.image0
        let videoSrc = data.videouri
        let videoTime = moment.utc(moment.duration(parseInt(data.videotime), 's').asMilliseconds()).format(parseInt(data.videotime) > 3600 ? 'HH:mm:ss' : 'mm:ss')
        let up = data.love
        let down = data.hate

        contents.push({
          id: id,
          content: content,
          time: time,
          imageSrc: imageSrc,
          videoSrc: videoSrc,
          videoTime: videoTime,
          up: up,
          down: down,
        })
      })

      callback(maxTime, contents)
    }

    const onError = err => {
      console.log(err)
      process.exit()
    }

    this.options.uri = uri
    this.beginCapture(this.options, onFinish, onError)
  }

  getImageSrc(imageList) {
    return JSON.stringify(imageList)
  }
}

exports.Worker = Worker
