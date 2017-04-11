const timer = require('../util/timer')
const conf = require('../conf')
const db = require('../db')
const budejieText = require('./worker-text')
const budejieImage = require('./worker-image')
const budejieVideo = require('./worker-video')


function getTextContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = budejieText.getSrc()
    budejieText.begin(uri, (contents) => {
    budejieText.saveContent(contents).then(errorCount => {
      if (errorCount > 1) {
        timer.stop()
        db.endPool()
      }
    })
    })
  })
}

function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = budejieImage.getSrc()
    budejieImage.begin(uri, (contents) => {
      console.log(contents)

      // TODO
      stopController.stop(contents, '1111')
    })
  })
}

function getVideoContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = budejieVideo.getSrc()
    budejieVideo.begin(uri, (contents) => {
      console.log(contents)

      // TODO
      stopController.stop(contents, '1111')
    })
  })
}


// const stopController = {
//   contentsStopper: (contents) => {
//     // stop when there are no more contents
//     if (!contents) {
//       budejieText.stop()
//       return true
//     }

//     return false
//   },

//   idStopper: (contents, lastId) => {
//     let stop = contents.forEach((content) => {
//       if (content.id === lastId)
//         return true
//     })

//     if (stop) {
//       budejieText.stop()
//       return true
//     }

//     return false
//   },

//   stop: (contents, lastId) => {
//     if (stopController.contentsStopper(contents))
//       return
//     if (stopController.idStopper(contents, lastId))
//       return
//   },
// }

module.exports = {
  getTextContents: getTextContents,
  getImageContents: getImageContents,
  getVideoContents: getVideoContents,
}

