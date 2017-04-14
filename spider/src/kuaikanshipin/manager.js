const Timer = require('../util/timer')
const conf = require('../conf')
const db = require('../db')
const kuaikanshipinVideo = require('./worker-video')
const workerBase = require('./worker-base')


class Manager {
  constructor() {

  }

  getVideoContents() {
    this.getContents(kuaikanshipinVideo)
  }

  getContents(workerNamespace) {
    const worker = new workerNamespace.Worker()
    const timer = new Timer.Timer(conf.floorTime, conf.ceilTime, () => {
      worker.begin(worker.getSrc(), (maxtime, contents) => {
        worker.setMaxTime(maxtime)
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
