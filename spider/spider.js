const budejie = require('./src/budejie/manager')
const neihanshequ = require('./src/neihanshequ/manager')
const sogou = require('./src/sogou/manager')
const kuaikanshipin = require('./src/kuaikanshipin/manager')


budejieManager = new budejie.Manager()
budejieManager.getTextContents()
// budejieManager.getImageContents()
// budejieManager.getVideoContents()

// budejie.getImageContents()
// budejie.getVideoContents()
// neihanshequ.getTextContents()
// neihanshequ.getImageContents()
// neihanshequ.getVideoContents()
// sogou.getImageContents()
// sogou.getGifContents()
// sogou.getVideoContents()
// kuaikanshipin.getVideoContents()
