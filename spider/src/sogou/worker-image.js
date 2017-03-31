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

        let id = data.sourceid
        let onlineTime = data.publish_time
        let time = moment(onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss')

        contents.push({
          id: id,
          content: content,
          time: time,
          imageList: imageList,
        })
      })

      callback(lastIndex, contents)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  begin: begin,
  getSrc: workerBase.getImageSrc,
  setLastIndex: workerBase.setImageLastIndex,
}
