const rp = require('request-promise')
const cheerio = require('cheerio')
const options = {
  transform: body => {
    return cheerio.load(body, {
      decodeEntities: false,
    })
  },
}

function getContent($, elem) {
  return $(elem).find('.ui-row-flex').find('p').html()
}

function getId($, elem) {
  return $(elem).find('.j-v-c').find('video').attr('data-id')
}

function getImageSrc($, elem) {
  return $(elem).find('.j-v-c').find('video').attr('poster')
}

function getVideoSrc($, elem) {
  return $(elem).find('.j-v-c').find('source').attr('src')
}

function getTime($, elem) {
  return $(elem).find('.ui-list-info').find('p').html()
}

function getUp($, elem) {
  return parseInt($(elem).find('.tool-praise').find('span').html())
}

function getDown($, elem) {
  return parseInt($(elem).find('.tool-cai').find('span').html())
}

function begin(uri, callback) {
  options.uri = uri
  rp(options)
    .then($ => {
      let contents = []
      $('.ui-border-b').each((index, elem) => {
        let content = getContent($, elem)
        let id = getId($, elem)
        let imageSrc = getImageSrc($, elem)
        let videoSrc = getVideoSrc($, elem)
        let time = getTime($, elem)
        let up = getUp($, elem)
        let down = getDown($, elem)
        contents.push({
          id: id,
          content: content,
          imageSrc: imageSrc,
          videoSrc: videoSrc,
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

exports.begin = begin
