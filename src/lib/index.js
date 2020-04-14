// 初始化接口
import { initMapApiLoader } from './services/injected-map-api-instance'

import Map from './components/map.vue'
import Marker from './components/marker.vue'
import InfoWindow from './components/info-window.vue'
import Polyline from './components/polyline.vue'
import Polygon from './components/polygon'
import Rectangel from './components/rectangle.vue'
import Circle from './components/circle'

import MapManager from './managers/map-manager'

let components = [
  Map,
  Marker,
  InfoWindow,
  Polyline,
  Polygon,
  Rectangel,
  Circle
]

let VueMap = {
  initMapApiLoader,
  MapManager
}

VueMap.install = (Vue) => {
  if (VueMap.installed) return
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created
  components.map(_component => {
    // register component
    Vue.component(_component.name, _component)

    // component cache
    VueMap[_component.name] = _component
  })
}

const install = function(Vue) {
  /* istanbul ignore if */
  if (install.installed) return
  VueMap.install(Vue)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default VueMap

export {
  MapManager,
  initMapApiLoader
}
export { lazyMapApiLoaderInstance } from './services/injected-map-api-instance'
