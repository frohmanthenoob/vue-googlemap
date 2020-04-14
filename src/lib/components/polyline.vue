<script>
import registerMixin from '../mixins/register-component'
import { toLngLat, lngLatTo } from '../utils/convert-helper'

export default {
  name: 'VueMapPolyline',
  mixins: [registerMixin],
  props: {
    vid: String,
    clickable: Boolean,
    draggable: Boolean,
    editable: Boolean,
    strokeColor: String,
    strokeOpacity: Number,
    // {0: CENTER, 1: INSIDE, 2: OUTSIDE}
    strokePosition: Number,
    strokeWeight: Number,
    visible: Boolean,
    zIndex: Number,
    // 是否绘制成大地线，如果为true，则绘制的线段为弧线
    geodesic: Boolean,
    path: Array,
    /**
     * [
        {
          icon: {
            path: 2,
            // fillOpacity: 1,
            // fillColor: '#ff0000',
            strokeColor: '#ffffff',
            strokeWeight: 2,
            // strokeOpacity: 0.5,
            scale: 1
          },
          repeat: '40px'
        }
      ]
     */
    /**
     * 将strokeOpacity设置为0，使用下面的icons可以让线段显示成虚线
     * [{
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 4
        },
        offset: '0',
        repeat: '20px'
      }]
     */
    icons: Array,
    events: Object
  },
  data() {
    return {
      converters: {
        path(arr) {
          if (arr && arr.length) {
            return arr.map(toLngLat)
          }
        }
      }
    }
  },
  methods: {
    __initComponent(options) {
      this.$mapComponent = new google.maps.Polyline(options)
    },
    $$getPath() {
      return this.$mapComponent.getPath().getArray().map(lngLatTo)
    }
  },
  render() {
    return null
  }
}
</script>
