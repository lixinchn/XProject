'use strict'

class Timer {
  constructor(floorTime, ceilTime, func) {
    if (floorTime < 0)
      floorTime = 0
    if (ceilTime < 0)
      ceilTime = floorTime

    this.isStop = false
    this.isIdle = true
    this.interval = Math.ceil((Math.random() * (ceilTime - floorTime)) + floorTime)
    this.func = func
  }

  everyRound() {
    let intervalId = setTimeout(() => {
      if (!this.isStop) {
        if (this.isIdle) {
          this.isIdle = false
          this.func()
        }
        this.everyRound()  
      }
    }, this.interval)
    return intervalId
  }

  stop() {
    this.isStop = true
  }

  makeIdle() {
    this.isIdle = true
  }
}

exports.Timer = Timer
