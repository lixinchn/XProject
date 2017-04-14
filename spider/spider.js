const budejie = require('./src/budejie/manager')
const neihanshequ = require('./src/neihanshequ/manager')
const sogou = require('./src/sogou/manager')
const kuaikanshipin = require('./src/kuaikanshipin/manager')


let namespace = process.argv[2]
let type = process.argv[3]
let manager = null

if (namespace === 'budejie')
  manager = new budejie.Manager()
else if (namespace === 'neihanshequ')
  manager = new neihanshequ.Manager()
else if (namespace === 'sogou')
  manager = new sogou.Manager()
else if (namespace === 'kuaikanshipin')
  manager = new kuaikanshipin.Manager()

if (manager) {
  if (type === 'text')
    manager.getTextContents()
  else if (type === 'image')
    manager.getImageContents()
  else if (type === 'video')
    manager.getVideoContents()
  else if (type === 'gif')
    manager.getGifContents()
}
