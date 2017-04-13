const conf = {
  floorTime: 1000,
  ceilTime: 3000,
  ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',

  contentType: {
    titleAnd3Pic: 1, // 标题+3张图
    titleAnd1Pic: 2, // 标题+1张图
    title: 3, // 标题
    contentAndPic: 4, // 文案+图片
    pic: 5, // 图片（静态或gif）
    content: 6, // 文案
  },

  budejie: {
    name: 'budejie',
    originalUrlPrefix: 'http://www.budejie.com',
  },

  neihanshequ: {
    name: 'neihanshequ',
    host: 'm.neihanshequ.com',
    refererImage: 'http://m.neihanshequ.com/pic/',
    refererVideo: 'http://m.neihanshequ.com/video/',
  },

  sogou: {
    name: 'sogou',
    host: 'shida.epro.sogou.com',
    ua: 'RecNews/1.6.3 (iPhone; iOS 10.2.1; Scale/3.00)',
  },

  kuaikanshipin: {
    name: 'kuaikanshipin',
    host: 'api.winapp111.com',
  }
}

module.exports = conf
