import browser from './utils/browser'
import trackerXHR, { Config } from './utils/trackerXHR'

interface MonitorConfig {
  onClick?: (data: ClickInfo, e: MouseEvent) => void
  onAjax?: Config
}

// noinspection SpellCheckingInspection
class Monitor {
  clickInfo?: ClickInfo
  client = {
    browser: '',
    device: '',
    engine: '',
    os: '',
    osVersion: '',
    screenHeight: 0,
    screenWidth: 0,
    userAgent: ''
  }

  constructor(cfg: MonitorConfig) {
    // 获取客户端信息
    this.client = browser()
    if (cfg.onClick) {
      this._handleClick = (e) => {
        const target = e.target as HTMLInputElement
        this.clickInfo = {
          bustime: new Date().getTime(),
          clientX: e.clientX,
          clientY: e.clientY,
          className: target?.className,
          id: target?.id,
          innerText: target?.innerText,
          name: target?.name,
          tagName: target?.tagName,
          value: target?.value
        }
        cfg.onClick && cfg.onClick(this.clickInfo, e)
      }
      addEventListener('click', this._handleClick)
    }

    if (cfg.onAjax) {
      trackerXHR(cfg.onAjax)
    }
  }

  onClick?: (clickInfo?: ClickInfo, e?: Event) => void

  _handleClick?: (e: MouseEvent) => void

  destroy() {
    this._handleClick && removeEventListener('click', this._handleClick)
  }
}

export default Monitor
