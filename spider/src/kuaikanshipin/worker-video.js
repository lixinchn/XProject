const rp = require('request-promise')
const cheerio = require('cheerio')
const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


const options = {
  json: true,
  headers: {
    'User-Agent': conf.ua,
    'Host': conf.kuaikanshipin.host,
  },
  resolveWithFullResponse: true,
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then(response => {
      // console.log(response)
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
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  begin: begin,
  getSrc: workerBase.getVideoSrc,
  setMaxtime: workerBase.setVideoMaxtime,
}
