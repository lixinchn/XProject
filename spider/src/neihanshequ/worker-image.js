const rp = require('request-promise')
const cheerio = require('cheerio')
const options = {
  json: true,
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Host': 'm.neihanshequ.com',
    'Upgrade-Insecure-Requests': '1',
  },
}

function getContent($, elem) {
  return $(elem).find('p').html()
}

function getId($, elem) {
  return $(elem).attr('data-group-id')
}

function getImageSrc($, elem) {
  return $(elem).find('.upload-img').attr('src')
}

function getUp($, elem) {
  return $(elem).find('.J-digg-btn').find('span').attr('data-count')
}

function getDown($, elem) {
  return $(elem).find('.J-bury-btn').find('span').attr('data-count')
}

function begin(uri, callback) {
  options.uri = uri
  console.log(uri)
  rp(options)
    .then($ => {
      // console.log($)
      // let contents = []
      // $('.item').each((index, elem) => {
      //   let id = getId($, elem)
      //   let content = getContent($, elem)
      //   let imageSrc = getImageSrc($, elem)
      //   let up = getUp($, elem)
      //   let down = getDown($, elem)
      //   contents.push({
      //     id: id,
      //     content: content,
      //     imageSrc: imageSrc,
      //     up: up,
      //     down: down,
      //   })
      // })

      // callback(contents)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.begin = begin
