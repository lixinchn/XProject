const rp = require('request-promise')
const cheerio = require('cheerio')
const options = {
  transform: body => {
    return cheerio.load(body, {
      decodeEntities: false,
    })
  },
}

function getHref($, elem) {
  return $(elem).attr('href')
}

function getContent($, elem) {
  return $(elem).find('p').html()
}

function getId($, elem) {
  return $(elem).attr('data-group-id')
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then($ => {
      let contents = []
      $('li .share_url').each((index, elem) => {
        let href = getHref($, elem)
        let id = getId($, elem)
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
