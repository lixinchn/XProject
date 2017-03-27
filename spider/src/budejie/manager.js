const budeji = require('./worker')


const getSrc = (() => {
  let page = 1
  let src = 'http://www.budejie.com/text/'

  return () => {
    return src + (page++)
  }
})()

function getContents() {
  const uri = getSrc()
  budeji.budejieDo(uri, (contents) => {
    console.log(contents)
  })
}

exports.do = getContents

