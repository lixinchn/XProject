const rp = require('request-promise')
const cheerio = require('cheerio')
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
        contents.push({
          href: href,
          id: id,
          content: content,
        })
      })

      callback(contents)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.begin = begin
