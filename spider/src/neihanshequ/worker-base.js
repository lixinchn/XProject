const getTextSrc = (() => {
  let src = 'http://neihanshequ.com/'

  return () => {
    return src
  }
})()

const getImageSrc = (() => {
  let src = 'http://m.neihanshequ.com/pic/?is_json=1'

  return () => {
    return src
  }
})()

module.exports = {
  getTextSrc: getTextSrc,
  getImageSrc: getImageSrc,
}
