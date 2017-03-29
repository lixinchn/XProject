const rp = require('request-promise')
const cheerio = require('cheerio')
const moment = require('moment')
const workerBase = require('./worker-base')
const conf = require('../conf')


const options = {
  json: true,
  headers: {
    'User-Agent': conf.ua,
    'Host': conf.neihanshequ.host,
    'Referer': conf.neihanshequ.refererImage,
    'Upgrade-Insecure-Requests': '1',
  },
  resolveWithFullResponse: true,
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then(response => {
      // 内涵社区只有设置了cookie才可以实现分页获取数据
      workerBase.setRequestCookie(options, response.headers['set-cookie'])

      // get contents
      let contents = []
      let maxTime = response.body.data.max_time
      response.body.data.data.forEach(data => {
        let group = data.group
        let content = group.content
        let id = group.id
        let imageSrc = group.large_image.url_list[0]
        let imageMiddleSrc = group.middle_image.url_list[0]
        let up = parseInt(group.digg_count)
        let down = parseInt(group.bury_count)
        let onlineTime = group.online_time
        let time = moment(onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        contents.push({
          id: id,
          content: content,
          imageSrc: imageSrc,
          imageMiddleSrc: imageMiddleSrc,
          up: up,
          down: down,
          time: time,
        })
      })

      callback(maxTime, contents)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.begin = begin
