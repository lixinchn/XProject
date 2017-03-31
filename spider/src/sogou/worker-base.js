const imgSrc = (() => {
  let src = 'https://shida.epro.sogou.com/discover_agent/getlist?api=5&appid=7747&b=%E6%AE%B5%E5%AD%90&cmd=getlist&count=15&f=gj&h=7E865C9F-AB5C-4D1A-AF09-AA663673AC16&idfa=9EF49E98-8A05-4AD0-90ED-9368C7B36036&machineType=iPhone%207%20Plus%20%28CDMA%29&mode=up&nt=wifi&pf=iOS&phone=1&pkg=com.sogou.recnews&simplejson=1&sys=iOS&t=0&v=1.6.3'
  let lastIndex = 0

  return {
    getImageSrc: () => {
      return !imgSrc.lastIndex ? src : src + '&lastindex=' + imgSrc.lastIndex
    },

    setLastIndex: lastIndex => {
      imgSrc.lastIndex = lastIndex
    }
  }
})()


module.exports = {
  getImageSrc: imgSrc.getImageSrc,
  setLastIndex: imgSrc.setLastIndex,
}
