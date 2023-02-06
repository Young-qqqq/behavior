interface BasicInfo {
  os: string // 操作系统版本 Windows | Linux | IOS | Android | Mac OS
  osVersion: string // 系统版本
  userAgent: string
  device: string // 设备
  engine: string // 浏览器引擎
  browser: string // 浏览器版本

  screenWidth: number // 屏幕分辨率宽
  screenHeight: number // 屏幕分辨率高
}

interface ClickInfo {
  bustime: number
  clientX: number
  clientY: number

  name: string // 元素名称
  className: string // 元素类名
  tagName: string // 元素标签名
  id: string // 元素id
  innerText: string
  value: string // 元素值
}

interface PageLoadInfo {
  domReady: number
  domBuild: number
  tcpTime: number
  dnsTime: number
  docRow: number
  pageTime: number
  FMP: number
  load: number
}

declare var opera: any

