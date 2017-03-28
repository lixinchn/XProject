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
  return $(elem).find('.j-r-list-c-desc').find('a').attr('href')
}

function getContent($, elem) {
  return $(elem).find('.j-r-list-c-desc').find('a').html()
}

function getImageSrc($, elem) {
  return $(elem).find('.j-r-list-c-img').find('img').attr('data-original')
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then($ => {
      let contents = []
      $('.j-r-list-c').each((index, elem) => {
        let href = getHref($, elem)
        let id = workerBase.getId(href)
        let content = getContent($, elem)
        let imageSrc = getImageSrc($, elem)
        contents.push({
          href: href,
          id: id,
          content: content,
          imageSrc: imageSrc,
        })
      })

      callback(contents)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.begin = begin
