const timer = require('../util/timer')
const conf = require('../conf')
const neihanshequText = require('./worker-text')
const neihanshequImage = require('./worker-image')
const workerBase = require('./worker-base')


function getTextContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getTextSrc()
    neihanshequText.begin(uri, (contents) => {
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getImageSrc()
    neihanshequImage.begin(uri, (contents) => {
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
}

