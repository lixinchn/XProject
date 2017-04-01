const timer = require('../util/timer')
const kuaikanshipin = require('./worker-video')
const conf = require('../conf')


function getVideoContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = kuaikanshipin.getSrc()
    kuaikanshipin.begin(uri, (maxtime, contents) => {
      kuaikanshipin.setMaxtime(maxtime)
      console.log(contents)

      // TODO
    })
  })
}

module.exports = {
  getVideoContents: getVideoContents,
}

