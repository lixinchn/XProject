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
      let minTime = response.body.data.min_time
      response.body.data.data.forEach(data => {
        let group = data.group
        let content = group.content
        let id = group.id
        let up = parseInt(group.digg_count)
        let down = parseInt(group.bury_count)
        let onlineTime = data.online_time
        let time = moment(onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        contents.push({
          id: id,
          content: content,
          up: up,
          down: down,
          time: time,
        })
      })

      callback(minTime, contents)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  begin: begin,
  getSrc: workerBase.getTextSrc,
  setMaxTime: workerBase.setTextMinTime,
}
