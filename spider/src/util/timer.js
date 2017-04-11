let isStop = false

function everyRound(floorTime, ceilTime, func) {
  if (floorTime < 0)
    floorTime = 0
  if (ceilTime < floorTime)
    ceilTime = floorTime

  let interval = Math.ceil((Math.random() * (ceilTime - floorTime)) + floorTime)
  let intervalId = setTimeout(() => {
    if (!isStop) {
      func()
      everyRound(floorTime, ceilTime, func)  
    }
  }, interval)
  return intervalId
}

function stop() {
  isStop = true
}

exports.everyRound = everyRound
exports.stop = stop
