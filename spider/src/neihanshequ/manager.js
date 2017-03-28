const timer = require('../util/timer')
const neihanshequ = require('./worker')


const getSrc = (() => {
  let src = 'http://neihanshequ.com/'

  return () => {
    return src
  }
})()

function getContents() {
  timer.everyRound(5000, 10000, () => {
    const uri = getSrc()
    neihanshequ.neihanshequDo(uri, (contents) => {
      console.log(contents)

      // TODO: stop when there are no more to insert into DB
    })
  })
}

const stopController = {
}

exports.do = getContents

