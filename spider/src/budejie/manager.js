const Timer = require('../util/timer')
const conf = require('../conf')
const db = require('../db')
const budejieText = require('./worker-text')
const budejieImage = require('./worker-image')
const budejieVideo = require('./worker-video')


class Manager {
  constructor() {

  }

  getTextContents() {
    const timer = new Timer.Timer(conf.floorTime, conf.ceilTime, () => {
      const worker = new budejieText.Worker()
      worker.begin(worker.getSrc(), (contents) => {
        worker.saveContent(contents).then(errorCount => {
          timer.makeIdle() // 一次抓取和存储结束，释放 timer
          console.log(errorCount)
          if (errorCount > 1) {
            timer.stop() // 大部分情况下是因为重复的内容过多，所以结束 timer
            db.endPool()
          }
        })
      })
    })
    timer.everyRound()
  }

  /*
  getImageContents() {
    timer.everyRound(conf.floorTime, conf.ceilTime, () => {
      const uri = budejieImage.getSrc()
      budejieImage.begin(uri, (contents) => {
        console.log(contents)

        // TODO
        stopController.stop(contents, '1111')
      })
    })
  }

  getVideoContents() {
    timer.everyRound(conf.floorTime, conf.ceilTime, () => {
      const uri = budejieVideo.getSrc()
      budejieVideo.begin(uri, (contents) => {
        console.log(contents)

        // TODO
        stopController.stop(contents, '1111')
      })
    })
  }
  */
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

/*
module.exports = {
  getTextContents: getTextContents,
  getImageContents: getImageContents,
  getVideoContents: getVideoContents,
}
*/
exports.Manager = Manager

