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
    this.getContents(budejieText)
  }

  getImageContents() {
    this.getContents(budejieImage)
  }

  getVideoContents() {
    this.getContents(budejieVideo)
  }

  getContents(workerNamespace) {
    const worker = new workerNamespace.Worker()
    const timer = new Timer.Timer(conf.floorTime, conf.ceilTime, () => {
      worker.begin(worker.getSrc(), (contents) => {
        worker.saveContent(contents, worker.type, worker.getSrc()).then(errorCount => {
          timer.makeIdle() // 一次抓取和存储结束，释放 timer
          // console.log(errorCount)
          if (errorCount > 1) {
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
