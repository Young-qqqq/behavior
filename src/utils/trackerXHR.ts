export interface Config {
  onLoad?: (info: XHRInfo, e: ProgressEvent) => void
  onError?: (info: XHRInfo, e: ProgressEvent) => void
  onAbort?: (info: XHRInfo, e: ProgressEvent) => void
}

interface XHRInfo {
  timestamp: number,
  status: number,
  statusText: string,
  url: string,
  responseType: XMLHttpRequestResponseType,
  params: Document | XMLHttpRequestBodyInit | null | undefined,
  response: string,
  type: string
}

type AjaxEventData = {
  type: string,
  function: Function
}

const trackerXHR = (cfg: Config) => {
  const eventArr: AjaxEventData[] = []
  // 拿到 XMLHttpRequest
  const XMLHttpRequest = window.XMLHttpRequest
  // 保存原有的open方法
  let xhrOpen = XMLHttpRequest.prototype.open
  const reqInfo: { methods?: string, async?: boolean } = {}
  // @ts-ignore
  XMLHttpRequest.prototype.open = function (methods, url, async) {
    // 获取请求信息
    // @ts-ignore
    reqInfo.methods = methods
    reqInfo.async = async
    return xhrOpen.call(this, methods, url, async)
  }
  // 保留原有的send方法
  const xhrSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function (request) {
    const timestamp = new Date().getTime() // 计算接口的duration, send 时记录请求时刻
    const handle = (cb: (info: XHRInfo, e: ProgressEvent) => void) => {
      return (e: ProgressEvent) => {
        const info = {
          timestamp,
          status: this.status,
          statusText: this.statusText,
          url: this.responseURL,
          responseType: this.responseType,
          params: request,
          response: JSON.stringify(this.response || ''),
          type: 'xhr'
        }
        cb(info, e)
      }
    }

    const { onLoad, onError, onAbort } = cfg

    // todo 内存泄漏
    if (onLoad) {
      const handler = handle(onLoad)
      this.addEventListener('load', handler)
      eventArr.push({
        type: 'load',
        function: handler
      })
    }
    if (onError) {
      const handler = handle(onError)
      this.addEventListener('error', handler)
      eventArr.push({
        type: 'error',
        function: handler
      })
    }
    if (onAbort) {
      const handler = handle(onAbort)
      this.addEventListener('abort', handler)
      eventArr.push({
        type: 'abort',
        function: handler
      })
    }
    return xhrSend.call(this, request)
  }
}

export default trackerXHR
