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
  timer.everyRound(5000, 10000, () => {
    const uri = getSrc()
    budejie.budejieDo(uri, (contents) => {
      console.log(contents)

      // TODO
      stopController.stop(contents, '1111')
    })
  })
}

const stopController = {
  contentsStopper: (contents) => {
    // stop when there are no more contents
    if (!contents) {
      budejie.stop()
      return true
    }

    return false
  },

  idStopper: (contents, lastId) => {
    let stop = contents.forEach((content) => {
      if (content.id === lastId)
        return true
    })

    if (stop) {
      budejie.stop()
      return true
    }

    return false
  },

  stop: (contents, lastId) => {
    if (stopController.contentsStopper(contents))
      return
    if (stopController.idStopper(contents, lastId))
      return
  },
}

exports.do = getContents

