const rp = require('request-promise')
const cheerio = require('cheerio')
const db = require('../db')
const conf = require('../conf')
const workerBase = require('./worker-base')
const options = {
  transform: body => {
    return cheerio.load(body, {
      decodeEntities: false,
    })
  },
}

function getHref($, elem) {
  return $(elem).find('a').attr('href')
}

function getContent($, elem) {
  return $(elem).find('a').html()
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then($ => {
      let contents = []
      $('.j-r-list-c-desc').each((index, elem) => {
        let href = getHref($, elem)
        let id = workerBase.getId(href)
        let content = getContent($, elem)
        let time = workerBase.getTime($, elem)
        let up = workerBase.getUp($, elem)
        let down = workerBase.getDown($, elem)
        contents.push({
          href: href,
          id: id,
          content: content,
          time: time,
          up: up,
          down: down,
        })
      })

      callback(contents)
    })
    .catch(err => {
      console.log(err)
    })
}

const saveContent = async (contents) => {
  let pool = db.getPool()
  let errorCount = 0

  for (let content of contents) {
    let params = makeParams(content)
    try {
      let results = await insert(pool, params)
      console.log(results)
    } catch(e) {
      // console.log(e)
      ++errorCount
    }
  }
  return errorCount
}

const insert = (pool, params) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO x_t_joke(source, original_id, text_content, original_date, \
      up, down, original_page, type) VALUES(?, ?, ?, ?, ?, ?, ?, ?);', params,
      (error, results, fields) => {
        if (error)
          reject(error)
        resolve(results)
      })  
  })
}

function makeParams(content) {
  let params = [
    conf.budejie.name,
    conf.budejie.name + '_' + content.id,
    content.content,
    content.time,
    content.up,
    content.down,
    conf.budejie.originalUrlPrefix + content.href,
    conf.contentType.content,
  ]
  return params
}

module.exports = {
  begin: begin,
  getSrc: workerBase.getTextSrc,
  saveContent: saveContent,
}
