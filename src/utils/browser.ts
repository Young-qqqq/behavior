// 系统区分
const getOS = () => {
  const u = navigator.userAgent
  if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
    return 'Windows'
  } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
    return 'Mac OS'
  } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
    return 'IOS'
  } else if (!!u.match(/android/i)) {
    return 'Android'
  } else if (u.indexOf('X11') !== -1) {
    return 'UNIX'
  } else if (u.indexOf('Linux') !== -1) {
    return 'Linux'
  } else {
    return 'unknown'
  }
}

// 各主流浏览器
const getBrowser = () => {
  const u = navigator.userAgent
  const bws = [{
    name: 'SogouSearch',
    it: /sogousearch/i.test(u)
  }, {
    name: 'Wechat',
    it: /MicroMessenger/i.test(u)
  }, {
    name: 'Weibo',
    it: !!u.match(/Weibo/i)
  }, {
    name: 'UC',
    it: !!u.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1
  }, {
    name: 'Sogou',
    it: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1
  }, {
    name: 'Xiaomi',
    it: u.indexOf('MiuiBrowser') > -1
  }, {
    name: 'Baidu',
    it: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1
  }, {
    name: '360',
    it: u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1
  }, {
    name: '2345',
    it: u.indexOf('2345Explorer') > -1
  }, {
    name: 'Edge',
    it: u.indexOf('Edge') > -1
  }, {
    name: 'IE11',
    it: u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1
  }, {
    name: 'IE',
    it: u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1
  }, {
    name: 'Firefox',
    it: u.indexOf('Firefox') > -1
  }, {
    name: 'Safari',
    it: u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1
  }, {
    name: 'QQBrowser',
    it: u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1
  }, {
    name: 'QQ',
    it: u.indexOf('QQ') > -1
  }, {
    name: 'Chrome',
    it: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1
  }, {
    name: 'Opera',
    it: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1
  }]

  for (let i = 0; i < bws.length; i++) {
    if (bws[i].it) {
      return bws[i].name
    }
  }
  return 'unknown'
}

const PC_OS = ['Windows', 'Mac OS', 'IOS']
const PHONE_OS = ['IOS', 'Android']

const getClient = function () {
  const engine = {
    ie: false, //这个属性用于确定是否是IE引擎
    gecko: false,
    webkit: false,
    khtml: false,
    opera: false,
    //引擎的版本
    name: '',
    ver: '0'
  }
  //浏览器
  const browser = {
    ie: false,
    firefox: false,
    chrome: false,
    safari: false,
    opera: false,
    //浏览器的版本号
    ver: '0',
    //浏览器通用名称
    name: ''
  }
  //系统
  const os = getOS()
  //核心检测程序区
  const ua = navigator.userAgent
  if (window?.opera) {
    engine.opera = browser.opera = true //表示确定opera引擎
    engine.name = 'opera'
    engine.ver = browser.ver = window.opera.version()
    browser.name = 'Opera'
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.webkit = true //表示确定webkit引擎
    engine.name = 'webkit'
    engine.ver = RegExp['$1']
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.chrome = true
      browser.ver = RegExp['$1']
      browser.name = 'Chrome'
    } else {
      browser.safari = true
      if (/Version\/(\S+)/.test(ua)) browser.ver = RegExp['$1']
      browser.name = 'Safari'
    }
  } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.gecko = true //表示确定gecko引擎
    engine.name = 'gecko'
    engine.ver = RegExp['$1']
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.firefox = true
      browser.ver = RegExp['$1']
      browser.name = 'Firefox'
    }
  } else if (/MSIE ([^;]+)/.test(ua)) {
    engine.ie = browser.ie = true //表示确定ie引擎
    engine.name = 'ie'
    engine.ver = browser.ver = RegExp['$1']
    browser.name = 'IE'
  }
  return { //返回一个对象，可以同时返回引擎，浏览器和系统的对象
    os,
    engine: engine,
    browser: { name: browser.name, version: browser.ver }
  }
}

const getClientInfo: () => BasicInfo = () => {
  const nav = window.navigator
  const client = getClient()

  let device = 'unknown'
  if (PC_OS.includes(client.os)) {
    device = 'PC'
  } else if (PHONE_OS.includes(client.os)) {
    device = 'Mobile'
  }

  return {
    os: client.os,
    osVersion: client.os,
    device,
    browser: client.browser.name,
    engine: `${client.engine.name}${' ' + client.engine.ver}`,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    userAgent: nav.userAgent
  }
}

export default getClientInfo
