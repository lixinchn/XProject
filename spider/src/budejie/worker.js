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
  // console.log($(elem).find('a').attr('href'))
  return $(elem).find('a').attr('href')
}

function getContent($, elem) {
  return $(elem).find('a').html()
}

function getId(href) {
  let hyphenIndex = href.indexOf('-')
  if (hyphenIndex === -1) {
    console.error('BUDEJIE: hyphenIndex hyphen error: %s', href)
    return
  }

  let dotIndex = href.indexOf('.')
  if (dotIndex === -1) {
    console.error('BUDEJIE: hyphenIndex dot error: %s', href)
    return
  }

  let id = href.substring(hyphenIndex + 1, dotIndex)
  return id
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then($ => {
      let contents = []
      $('.j-r-list-c-desc').each((index, elem) => {
        let href = getHref($, elem)
        let id = getId(href)
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

exports.budejieDo = begin
