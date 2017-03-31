const timer = require('../util/timer')
const conf = require('../conf')
const neihanshequText = require('./worker-text')
const neihanshequImage = require('./worker-image')
const neihanshequVideo = require('./worker-video')
const workerBase = require('./worker-base')


function getTextContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = neihanshequText.getSrc()
    neihanshequText.begin(uri, (minTime, contents) => {
      neihanshequText.setMaxTime(minTime)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = neihanshequImage.getSrc()
    neihanshequImage.begin(uri, (maxTime, contents) => {
      neihanshequImage.setMaxTime(maxTime)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getVideoContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = neihanshequVideo.getSrc()
    neihanshequVideo.begin(uri, (maxTime, contents) => {
      neihanshequVideo.setMaxTime(maxTime)
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

