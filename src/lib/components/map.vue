<template>
  <div class="vue-map-container">
    <div class="vue-map">
      <slot name="map"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import guid from '../utils/guid'
import CONST from '../utils/constant'
import { lngLatTo, toLngLat, toControlPosition } from '../utils/convert-helper'
import registerMixin from '../mixins/register-component'
import {lazyMapApiLoaderInstance} from '../services/injected-map-api-instance'

const TAG = 'VueMap'
const controlPositionValidator = function(value) {
  return [
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ].indexOf(value) !== -1
}
export default {
  name: TAG,
  mixins: [registerMixin],
  props: {
    vid: String,
    backgroundColor: String,
    center: [Array, Object],
    clickableIcons: Boolean,
    controlSize: Number,
    disableDefaultUi: Boolean,
    disableDoubleClickZoom: Boolean,
    draggable: Boolean,
    dragEnable: Boolean,
    draggableCursor: String,
    draggingCursor: String,
    fullscreenControl: Boolean,
    fullscreenControlPosition: {
      type: String,
      validator: controlPositionValidator
    },
    fullscreenControlOptions: Object,
    gestureHandling: {
      type: String,
      validator: function(value) {
        return ['cooperative', 'greedy', 'none', 'auto'].indexOf(value) !== -1
      }
    },
    heading: Number,
    keyboardShortcuts: Boolean,
    mapTypeControl: Boolean,
    mapTypeControlOptions: Object,
    mapTypeId: {
      type: String,
      validator: function(value) {
        return ['hybrid', 'roadmap', 'satellite', 'terrain'].indexOf(value) !== -1
      }
    },
    zoom: Number,
    zooms: [Number, Number],
    noClear: Boolean,
    panControl: Boolean,
    panControlOptions: Object,
    restriction: Object,
    rotateControl: Boolean,
    rotateEnable: Boolean,
    rotateControlPosition: {
      type: String,
      validator: controlPositionValidator
    },
    rotateControlOptions: Object,
    scaleControl: Boolean,
    scaleControlOptions: Object,
    scrollwheel: Boolean,
    scrollWheel: Boolean,
    streetView: Object,
    streetViewControl: Boolean,
    styles: Array,
    tilt: Number,
    zoomControl: Boolean,
    zoomEnable: Boolean,
    zoomControlOptions: Object,
    events: Object,
    mapManager: Object,
    bounds: Array
  },

  beforeCreate() {
    this._loadPromise = lazyMapApiLoaderInstance.load()
  },

  data() {
    return {
      mapTagName: TAG,
      propsRedirect: {
        scrollWheel: 'scrollwheel',
        zoomEnable: 'zoomControl',
        dragEnable: 'draggable',
        rotateEnable: 'rotateControl',
        fullscreenControlPosition: 'fullscreenControlOptions',
        rotateControlPosition: 'rotateControlOptions',
        disableDefaultUi: 'disableDefaultUI'
      },
      converters: {
        center(arr) {
          return toLngLat(arr)
        },
        fullscreenControlPosition(val) {
          return {
            position: toControlPosition(val)
          }
        },
        rotateControlPosition(val) {
          return {
            position: toControlPosition(val)
          }
        }
      },
      handlers: {
        zooms(arr) {
          this.setOptions({
            minZoom: arr[0],
            maxZoom: arr[1]
          })
        },
        bounds(val) {
          if (val) {
            this.fitBounds(val)
          }
        }
      }
    }
  },

  mounted() {
    this.createMap()
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
    },
    $$getZoom() {
      if (!this.$map) return 0
      return this.$map.getZoom()
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
