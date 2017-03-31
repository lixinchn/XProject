const timer = require('../util/timer')
const conf = require('../conf')
const sogouImage = require('./worker-image')
const sogouGif = require('./worker-gif')
const workerBase = require('./worker-base')


function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getImageSrc()
    sogouImage.begin(uri, (lastIndex, contents) => {
      workerBase.setImageLastIndex(lastIndex)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getGifContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = workerBase.getGifSrc()
    sogouGif.begin(uri, (lastIndex, contents) => {
      workerBase.setGifLastIndex(lastIndex)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

const stopController = {
}

module.exports = {
  getImageContents: getImageContents,
  getGifContents: getGifContents,
}

