const timer = require('../util/timer')
const conf = require('../conf')
const sogouImage = require('./worker-image')
const sogouGif = require('./worker-gif')
const sogouVideo = require('./worker-video')


function getImageContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = sogouImage.getSrc()
    sogouImage.begin(uri, (lastIndex, contents) => {
      sogouImage.setLastIndex(lastIndex)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getGifContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = sogouGif.getSrc()
    sogouGif.begin(uri, (lastIndex, contents) => {
      sogouGif.setLastIndex(lastIndex)
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

function getVideoContents() {
  timer.everyRound(conf.floorTime, conf.ceilTime, () => {
    const uri = sogouVideo.getSrc()
    sogouVideo.begin(uri, (lastIndex, contents) => {
      sogouVideo.setLastIndex(lastIndex)
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
  getVideoContents: getVideoContents,
}

