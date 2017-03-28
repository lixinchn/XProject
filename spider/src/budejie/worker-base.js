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


const getTextSrc = (() => {
  let page = 1
  let src = 'http://www.budejie.com/text/'

  return () => {
    return src + (page++)
  }
})()

const getImageSrc = (() => {
  let page = 1
  let src = 'http://www.budejie.com/pic/'

  return () => {
    return src + (page++)
  }
})()

const getVideoSrc = (() => {
  let page = 1
  let src = 'http://m.budejie.com/video/'

  return () => {
    return src + (page++)
  }
})()

module.exports = {
  getId: getId,
  getTextSrc: getTextSrc,
  getImageSrc: getImageSrc,
  getVideoSrc: getVideoSrc,
}
