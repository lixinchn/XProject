const rp = require('request-promise')
const cheerio = require('cheerio')
const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


const options = {
  json: true,
  headers: {
    'User-Agent': conf.sogou.ua,
    'Host': conf.sogou.host,
  },
  resolveWithFullResponse: true,
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then(response => {
      // get contents
      let contents = []
      let lastIndex = response.body.lastindex
      response.body.url_infos.forEach(data => {
        let content = data.title

        let imageList = []
        data.images.forEach(image => {
          imageList.push(image.name)
        })

        let id = data.index
        let onlineTime = data.publish_time
        let time = moment(onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        let videoTime = data.video_time
        let videoUrl = data.url

        contents.push({
          id: id,
          content: content,
          time: time,
          imageList: imageList,
          videoTime: videoTime,
          videoUrl: videoUrl,
        })
      })

      callback(lastIndex, contents)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.begin = begin
