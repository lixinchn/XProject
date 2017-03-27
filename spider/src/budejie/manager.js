const timer = require('../util/timer')
const budejie = require('./worker')


const getSrc = (() => {
  let page = 1
  let src = 'http://www.budejie.com/text/'

  return () => {
    return src + (page++)
  }
})()

function getContents() {
  let count = 0
  timer.everyRound(5000, 10000, () => {
    const uri = getSrc()
    budejie.budejieDo(uri, (contents) => {
      console.log(contents)
    })
  })
}

exports.do = getContents

