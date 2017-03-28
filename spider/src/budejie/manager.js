const timer = require('../util/timer')
const budejieText = require('./worker-text')
const budejieImage = require('./worker-image')
const workerBase = require('./worker-base')
const conf = require('../conf')


function getTextContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getTextSrc()
    budejieText.begin(uri, (contents) => {
      console.log(contents)

      // TODO
      stopController.stop(contents, '1111')
    })
  })
}

function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getImageSrc()
    budejieImage.begin(uri, (contents) => {
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
      budejieText.stop()
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
      budejieText.stop()
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

module.exports = {
  getTextContents: getTextContents,
  getImageContents: getImageContents,
}

