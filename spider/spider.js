const budejie = require('./src/budejie/manager')
const neihanshequ = require('./src/neihanshequ/manager')
const sogou = require('./src/sogou/manager')
const kuaikanshipin = require('./src/kuaikanshipin/manager')


// budejieManager = new budejie.Manager()
// budejieManager.getTextContents()
// budejieManager.getImageContents()
// budejieManager.getVideoContents()

// neihanshequManager = new neihanshequ.Manager()
// neihanshequManager.getTextContents()
// neihanshequManager.getImageContents()
// neihanshequManager.getVideoContents()

sogouManager = new sogou.Manager()
sogouManager.getImageContents()

// budejie.getImageContents()
// budejie.getVideoContents()
// neihanshequ.getTextContents()
// neihanshequ.getImageContents()
// neihanshequ.getVideoContents()
// sogou.getImageContents()
// sogou.getGifContents()
// sogou.getVideoContents()
// kuaikanshipin.getVideoContents()
