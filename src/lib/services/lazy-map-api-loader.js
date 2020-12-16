
const DEFAULT_MAP_CONFIG = {
  key: null,
  protocol: 'https',
  hostAndPath: 'maps.googleapis.com/maps/api/js',
  callback: 'mapInitComponent',
  language: null,
  region: null,
  libraries: null
}

export default class MapAPILoader {
  /**
   * @param config required 初始化参数
   */
  constructor(config) {
    this._config = {
      ...DEFAULT_MAP_CONFIG,
      ...config
    }
    this._document = document
    this._window = window
    this._scriptLoaded = false
  }

  load() {
    if (this._window.google && this._window.google.maps && this._window.google.maps.Map) {
      return Promise.resolve()
    }

    if (this._scriptLoadingPromise) return this._scriptLoadingPromise
    const script = this._document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = this._getScriptSrc()

    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._window['mapInitComponent'] = () => {
        resolve()
      }
      script.onerror = error => reject(error)
    })
    this._document.head.appendChild(script)
    return this._scriptLoadingPromise
  }

  _getScriptSrc() {

    const config = this._config
    const paramKeys = ['key', 'callback', 'language', 'region', 'libraries']

    const params = Object.keys(config)
      .filter(k => ~paramKeys.indexOf(k))
      .filter(k => config[k] != null)
      .filter(k => {
        return !Array.isArray(config[k]) ||
          (Array.isArray(config[k]) && config[k].length > 0)
      })
      .map(k => {
        let v = config[k]
        if (Array.isArray(v)) return { key: k, value: v.join(',')}
        return {key: k, value: v}
      })
      .map(entry => `${entry.key}=${entry.value}`)
      .join('&')
    return `${this._config.protocol}://${this._config.hostAndPath}?${params}`
  }
}
