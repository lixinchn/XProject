'use strict'

const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
    this.src = 'https://shida.epro.sogou.com/discover_agent/getlist?'
  }

  begin(uri, callback) {
    const onFinish = response => {
      // get contents
      let contents = []
      let lastIndex = response.body.lastindex
      response.body.url_infos.forEach(data => {
        let content = data.title

        let imageList = []
        data.images.forEach(image => {
          imageList.push(image.name)
        })

        let id = data.sourceid
        let onlineTime = data.publish_time
        let time = moment(onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        let url = data.url
        let wapUrl = data.wapurl
        let up = this.getStandardUp()
        let down = this.getStandardDown()

        contents.push({
          id: id,
          content: content,
          time: time,
          imageList: imageList,
          type: content ? conf.contentType.contentAndPic : conf.contentType.pic,
          imageSrc: this.getImageSrc(imageList),
          up: up,
          down: down,
          originalPage: wapUrl || url,
        })
      })

      callback(lastIndex, contents)
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
