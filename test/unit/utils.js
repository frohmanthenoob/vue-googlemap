// import Vue from 'Vue';
import VueMap from '../../src/lib'
// Vue.use(VueMap);
// initMap();

export function initMap(options) {
  VueMap.initMapApiLoader({
    key: 'AIzaSyD9aX2PDz6T6KZPshz1-ETbnqSKUIy5QYg',
    ...options
  })
}
