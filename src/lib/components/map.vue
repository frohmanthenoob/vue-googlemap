<template>
  <div class="vue-map-container">
    <div class="vue-map"></div>
    <slot></slot>
  </div>
</template>
<script>
import guid from '../utils/guid'
import CONST from '../utils/constant'
import { lngLatTo, toLngLat } from '../utils/convert-helper'
import registerMixin from '../mixins/register-component'
import {lazyMapApiLoaderInstance} from '../services/injected-map-api-instance'
export default {
  name: 'VueMap',
  mixins: [registerMixin],
  props: [
    'vid',
    'events',
    'center',
    'zoom',
    'zooms',
    'dragEnable',
    'zoomEnable',
    'rotateEnable',
    'scrollWheel',
    'clickableIcons',
    'mapManager'  // 地图管理 manager
  ],

  beforeCreate() {
    this._loadPromise = lazyMapApiLoaderInstance.load()
  },

  data() {
    return {
      propsRedirect: {
        scrollWheel: 'scrollwheel',
        zoomEnable: 'zoomControl',
        dragEnable: 'draggable',
        rotateEnable: 'rotateControl'
      },
      converters: {
        center(arr) {
          return toLngLat(arr)
        }
      },
      handlers: {
        zooms(arr) {
          this.setOptions({
            minZoom: arr[0],
            maxZoom: arr[1]
          })
        }
      }
    }
  },

  mounted() {
    this.createMap()
  },

  addEvents() {
    this.$mapComponent.addListener('center_changed', () => {
      let centerLngLat = this.$mapComponent.getCenter()
      this.$emit('update:center', [centerLngLat.lng(), centerLngLat.lat()])
    })
  },

  methods: {

    createMap() {
      this._loadPromise.then(() => {
        let mapElement = this.$el.querySelector('.vue-map')
        const elementID = this.vid || guid()
        mapElement.id = elementID
        const props = this.convertProps()
        // 默认地图图标不可点击
        props.clickableIcons = props.clickableIcons || false
        this.$map = this.$mapComponent = new google.maps.Map(mapElement, props)
        if (this.mapManager) this.mapManager.setMap(this.$map)
        this.$emit(CONST.MAP_READY_EVENT, this.$map)
        this.$children.forEach(component => {
          component.$emit(CONST.MAP_READY_EVENT, this.$map)
        })
      })
    },
    $$getCenter() {
      if (!this.$map) return lngLatTo(this.center)
      return lngLatTo(this.$map.getCenter())
    }
  }
}
</script>

<style >
.vue-map-container,
.vue-map {
  height: 100%;
}
</style>
