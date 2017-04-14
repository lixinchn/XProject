const Timer = require('../util/timer')
const conf = require('../conf')
const db = require('../db')
// const sogouText = require('./worker-text')
const sogouImage = require('./worker-image')
const sogouGif = require('./worker-gif')
const sogouVideo = require('./worker-video')
const workerBase = require('./worker-base')


class Manager {
  constructor() {

  }

  // getTextContents() {
  //   this.getContents(sogouText)
  // }

  getImageContents() {
    this.getContents(sogouImage)
  }

  getGifContents() {
    this.getContents(sogouGif)
  }

  getVideoContents() {
    this.getContents(sogouVideo)
  }

  getContents(workerNamespace) {
    const worker = new workerNamespace.Worker()
    const timer = new Timer.Timer(conf.floorTime, conf.ceilTime, () => {
      worker.begin(worker.getSrc(), (lastIndex, contents) => {
        worker.setLastIndex(lastIndex)
        worker.saveContent(contents, worker.getSrc()).then(errorCount => {
          timer.makeIdle() // 一次抓取和存储结束，释放 timer
          // console.log(errorCount)
          if (errorCount > 10) {
            timer.stop() // 大部分情况下是因为重复的内容过多，所以结束 timer
            db.endPool() // 必须执行这一句 node 环境才会退出
          }
        })
      })
    })
    timer.everyRound()
  }
}

exports.Manager = Manager



// const timer = require('../util/timer')
// const conf = require('../conf')
// const sogouImage = require('./worker-image')
// const sogouGif = require('./worker-gif')
// const sogouVideo = require('./worker-video')


// function getImageContents() {
//   timer.everyRound(conf.floorTime, conf.ceilTime, () => {
//     const uri = sogouImage.getSrc()
//     sogouImage.begin(uri, (lastIndex, contents) => {
//       sogouImage.setLastIndex(lastIndex)
//       console.log(contents)

//       // TODO: stop when there are no more to insert into DB
//     })
//   })
// }

// function getGifContents() {
//   timer.everyRound(conf.floorTime, conf.ceilTime, () => {
//     const uri = sogouGif.getSrc()
//     sogouGif.begin(uri, (lastIndex, contents) => {
//       sogouGif.setLastIndex(lastIndex)
//       console.log(contents)

//       // TODO: stop when there are no more to insert into DB
//     })
//   })
// }

// function getVideoContents() {
//   timer.everyRound(conf.floorTime, conf.ceilTime, () => {
//     const uri = sogouVideo.getSrc()
//     sogouVideo.begin(uri, (lastIndex, contents) => {
//       sogouVideo.setLastIndex(lastIndex)
//       console.log(contents)

//       // TODO: stop when there are no more to insert into DB
//     })
//   })
// }

// const stopController = {
// }

// module.exports = {
//   getImageContents: getImageContents,
//   getGifContents: getGifContents,
//   getVideoContents: getVideoContents,
// }

