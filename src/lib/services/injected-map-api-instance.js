let lazyMapApiLoaderInstance = null
import MapAPILoader from './lazy-map-api-loader'
import Vue from 'vue'
export const initMapApiLoader = (config) => {
  if (Vue.prototype.$isServer) return
  // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  if (lazyMapApiLoaderInstance) return
  if (!lazyMapApiLoaderInstance) lazyMapApiLoaderInstance = new MapAPILoader(config)
  lazyMapApiLoaderInstance.load()
}
export { lazyMapApiLoaderInstance }
