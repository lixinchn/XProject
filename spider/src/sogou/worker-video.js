'use strict'

const queryString = require('query-string')
const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


class Worker extends workerBase.WorkerBase {
  constructor() {
    super()
    this.src = 'https://shida.epro.sogou.com/discover_agent/getlist?'
    this.newParams = { b: '%E5%A4%A7%E5%9B%BE%E8%A7%86%E9%A2%91' }
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
        let videoTime = data.video_time
        let videoSrc = data.url


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
          videoTime: videoTime,
          videoSrc: videoSrc,
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
    let urls = []
    imageList.forEach(image => {
      let url = queryString.parse(image)
      urls.push(url.url)
    })
    return JSON.stringify(urls)
  }
}

exports.Worker = Worker
