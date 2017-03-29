const timer = require('../util/timer')
const conf = require('../conf')
const neihanshequText = require('./worker-text')
const neihanshequImage = require('./worker-image')
const neihanshequVideo = require('./worker-video')
const workerBase = require('./worker-base')


function getTextContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getTextSrc()
    neihanshequText.begin(uri, (minTime, contents) => {
      workerBase.setTextMinTime(minTime)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getImageSrc()
    neihanshequImage.begin(uri, (maxTime, contents) => {
      workerBase.setImageMaxTime(maxTime)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getVideoContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getVideoSrc()
    neihanshequVideo.begin(uri, (maxTime, contents) => {
      workerBase.setVideoMaxTime(maxTime)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

const stopController = {
}

module.exports = {
  getTextContents: getTextContents,
  getImageContents: getImageContents,
  getVideoContents: getVideoContents,
}

